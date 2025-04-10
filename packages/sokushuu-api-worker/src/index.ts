import { Context, Hono } from "hono";
import { setCookie, getCookie, deleteCookie } from "hono/cookie";
import { cors } from "hono/cors";
import { createMiddleware } from "hono/factory";

import { generateChatCompletion } from "./utils/gemini";

const app = new Hono();

/**
 * ================================
 *  MIDDLEWARES
 * ================================
 */

interface AuthMiddlewareContext extends Context {
	Variables: {
		address: string;
	}
}

const authMiddleware = createMiddleware<AuthMiddlewareContext>(async (c, next) => {
	const address = c.req.header("X-Address");
	if (!address) {
		c.status(401);
		return c.json({ error: "Unauthorized" });
	}

	c.set("address", address);
	await next();
});

app.use("*", cors({
	origin: ["http://localhost:5173", "https://sokushuu.de", "https://app.sokushuu.de"]
}));

app.get("/", (c) => c.json({ message: "Welcome to Sokushuu API 0.1.0" }));

/**
 * ================================
 *  AUTHENTICATION
 * ================================
 */
app.post("/auth/login", async (c) => {
	const { address } = await c.req.json();
	setCookie(c, "address", address);
	c.status(201);
	return c.json({ data: { address } });
});

app.post("/auth/logout", authMiddleware, async (c) => {
	deleteCookie(c, "address");
	return c.json({ data: { address: null } });
});
/**
 * ================================	
 *  CHAT
 * ================================
 */

// get 10 messages history from the wallet address
app.get("/chat/wallet/history", authMiddleware, async (c) => {
	const address = c.get("address");

	const { results } = await c.env.DB.prepare(
		"SELECT Message as message, IsUser as isUser, CreatedAt as timestamp FROM Messages WHERE Address = ? ORDER BY CreatedAt DESC LIMIT 10"
	).bind(address).all();

	return c.json({ data: results });
});

// send a message from a wallet address
app.post("/chat/wallet/message", authMiddleware, async (c) => {
	const address = c.get("address");
	const { content } = await c.req.json();

	const { candidates, usageMetadata, modelVersion } = await generateChatCompletion(c, content);

	const chatResponse: string[] = [];
	for (const candidate of candidates) {
		for (const part of candidate.content.parts) {
			chatResponse.push(part.text);
		}
	}

	// insert 2 times, one for the user and one for the AI
	const { success } = await c.env.DB.prepare(
		"INSERT INTO Messages (Message, Address, IsUser) VALUES (?, ?, ?), (?, ?, ?)"
	).bind(
		content,
		address,
		true,
		chatResponse.join("\n"),
		address,
		false
	).run();

	// for now will ignore if message is not sotred in the database

	c.status(201);
	return c.json({ data: { address, content, candidates, usageMetadata, modelVersion } });
});

/**
 * ================================
 *  HOMEPAGE DASHBOARD
 * ================================
 */

app.get("/homepage/dashboard", authMiddleware, async (c) => {
	const address = c.get("address");
	// const favoriteCollections: string[] = []; // TODO: implement
	// const recentlyViewedCollections: string[] = []; // TODO: implement
	// const recentlyCreatedCollections: string[] = [];

	const exploreCollectionPromise = c.env.DB.prepare(
		"SELECT CollectionId as collectionId, Name as name, Creator as creator, SellingPrice as sellingPrice FROM Collections ORDER BY CreatedAt DESC LIMIT 5"
	).all();	

	const recentlyCreatedCollectionPromise = c.env.DB.prepare(
		"SELECT CollectionId as collectionId, Name as name, Creator as creator, SellingPrice as sellingPrice FROM Collections WHERE Creator = ? ORDER BY CreatedAt DESC LIMIT 5"
	).bind(address).all();

	const [exploreCollections, recentlyCreatedCollections] = await Promise.all([exploreCollectionPromise, recentlyCreatedCollectionPromise]);

	const data = {
		address,
		exploreCollections: exploreCollections.results,
		// favoriteCollections,
		// recentlyViewedCollections,
		recentlyCreatedCollections: recentlyCreatedCollections.results,
	};
	return c.json({ data });
});

app.get("/homepage/dashboard/search", authMiddleware, async (c) => {
	const { query } = c.req.query();

	const searchResults = await c.env.DB.prepare(
		"SELECT CollectionId as collectionId, Name as name, Creator as creator, SellingPrice as sellingPrice FROM Collections WHERE Name LIKE ? ORDER BY CreatedAt DESC LIMIT 30"
	).bind(`%${query}%`).all();

	const data = {
		query,
		searchResults: searchResults.results,
	};
	return c.json({ data });
});

app.get("/homepage/dashboard/category/:slug", authMiddleware, async (c) => {
	const address = c.get("address");
	const { slug } = c.req.param();
	let collections = [];
	if (slug === 'recently-created') {
		collections = await c.env.DB.prepare(
			"SELECT CollectionId as collectionId, Name as name, Creator as creator, SellingPrice as sellingPrice FROM Collections WHERE Creator = ? ORDER BY CreatedAt DESC LIMIT 30"
		).bind(address).all();
	} else {
		collections = await c.env.DB.prepare(
			"SELECT CollectionId as collectionId, Name as name, Creator as creator, SellingPrice as sellingPrice FROM Collections ORDER BY CreatedAt DESC LIMIT 30"
		).all();
	}
	const data = {
		slug,
		collections: collections.results,
	};
	return c.json({ data });
});

app.get("/homepage/dashboard/collection/:id", authMiddleware, async (c) => {
	const { id } = c.req.param();

	const collectionPromise = c.env.DB.prepare(
		"SELECT CollectionId as collectionId, Name as name, Address as address, Creator as creator, SellingPrice as sellingPrice FROM Collections WHERE CollectionId = ?"
	).bind(id).first();

	const flashcardsPromise = c.env.DB.prepare(
		"SELECT FlashcardId as flashcardId, Front as front, Back as back FROM Flashcards WHERE CollectionId = ? ORDER BY CreatedAt DESC LIMIT 30"
	).bind(id).all();

	const [collection, flashcards] = await Promise.all([collectionPromise, flashcardsPromise]);

	const data = {
		id,
		meta: collection,
		flashcards: flashcards.results,
	};
	return c.json({ data });
});

/**
 * ================================
 *  Flashcard Collection Management
 * ================================
 */

app.post("/homepage/dashboard/collection", authMiddleware, async (c) => {
	const address = c.get("address");
	const { name } = await c.req.json();

	const { success } = await c.env.DB.prepare(
		"INSERT INTO Collections (Name, Creator) VALUES (?, ?)"
	).bind(name, address).run();

	c.status(201);
	return c.json({ data: { address, name, success } });
});

app.post("/homepage/dashboard/collection/flashcard", authMiddleware, async (c) => {
	const address = c.get("address");
	const { collectionId, front, back } = await c.req.json();

	if (!collectionId || !front || !back) {
		c.status(400);
		return c.json({ error: "Missing required fields" });
	}

	const { success } = await c.env.DB.prepare(
		"INSERT INTO Flashcards (CollectionId, Front, Back) VALUES (?, ?, ?)"
	).bind(collectionId, front, back).run();

	c.status(201);
	return c.json({ data: { address, collectionId, front, back, success } });
});

app.delete("/homepage/dashboard/collection/flashcard/:collectionAddress/:flashcardId", authMiddleware, async (c) => {
	const address = c.get("address");
	const { collectionAddress, flashcardId } = c.req.param();
	c.status(201);
	return c.json({ data: { address, collectionAddress, flashcardId } });
});

app.post("/homepage/dashboard/collection/:collectionAddress/buy", authMiddleware, async (c) => {
	const address = c.get("address");
	const { collectionAddress } = c.req.param();
	const { price } = await c.req.json();
	c.status(201);
	return c.json({ data: { address, collectionAddress, price } });
});

app.patch("/homepage/dashboard/collection/:collectionId/sell", authMiddleware, async (c) => {
	const { collectionId } = c.req.param();
	const { price, collectionAddress } = await c.req.json();

	// update SellingPrice and Address
	const { success } = await c.env.DB.prepare(
		"UPDATE Collections SET SellingPrice = ?, Address = ? WHERE CollectionId = ?"
	).bind(price, collectionAddress, collectionId).run();

	c.status(200);
	return c.json({ data: { collectionId, collectionAddress, price, success } });
});

export default app;

