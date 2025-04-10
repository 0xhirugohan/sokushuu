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
	const address = getCookie(c, "address");
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
	// set address value to cookie
	setCookie(c, "address", address);
	c.status(201);
	return c.json({ data: { address } });
});

app.post("/auth/logout", authMiddleware, async (c) => {
	deleteCookie(c, "address");
	c.status(201);
	return c.json({ data: { address: null } });
});
/**
 * ================================	
 *  CHAT
 * ================================
 */

// get 10 messages history from the wallet address
app.get("/chat/wallet/history", authMiddleware, (c) => {
	const address = c.get("address");
	const histories: string[] = [];
	return c.json({ data: histories });
});

// send a message from a wallet address
app.post("/chat/wallet/message", async (c) => {
	// const address = c.get("address");
	const address = "0x0000000000000000000000000000000000000000";
	const { content } = await c.req.json();

	const { candidates, usageMetadata, modelVersion } = await generateChatCompletion(c, content);

	c.status(201);
	return c.json({ data: { address, content, candidates, usageMetadata, modelVersion } });
});

/**
 * ================================
 *  HOMEPAGE DASHBOARD
 * ================================
 */

app.get("/homepage/dashboard", authMiddleware, (c) => {
	const address = c.get("address");
	const exploreCollections: string[] = [];
	const favoriteCollections: string[] = [];
	const recentlyViewedCollections: string[] = [];
	const recentlyCreatedCollections: string[] = [];

	const data = {
		address,
		exploreCollections,
		favoriteCollections,
		recentlyViewedCollections,
		recentlyCreatedCollections,
	};
	return c.json({ data });
});

app.get("/homepage/dashboard/search", authMiddleware, (c) => {
	const { query } = c.req.query();
	const searchResults: string[] = [];
	const data = {
		query,
		searchResults,
	};
	return c.json({ data });
});

app.get("/homepage/dashboard/category/:slug", authMiddleware, (c) => {
	const { slug } = c.req.param();
	const collections: string[] = [];
	const data = {
		slug,
		collections,
	};
	return c.json({ data });
});

app.get("/homepage/dashboard/collection/:collectionAddress", authMiddleware, (c) => {
	const { collectionAddress } = c.req.param();
	const meta = {};
	const flashcards: string[] = [];
	const data = {
		collectionAddress,
		meta,
		flashcards,
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
	const { name, collectionAddress } = await c.req.json();
	c.status(201);
	return c.json({ data: { address, name, collectionAddress } });
});

app.post("/homepage/dashboard/collection/flashcard", authMiddleware, async (c) => {
	const address = c.get("address");
	const { collectionAddress, front, back } = await c.req.json();
	c.status(201);
	return c.json({ data: { address, collectionAddress, front, back } });
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

app.post("/homepage/dashboard/collection/:collectionAddress/sell", authMiddleware, async (c) => {
	const address = c.get("address");
	const { collectionAddress } = c.req.param();
	const { price } = await c.req.json();
	c.status(201);
	return c.json({ data: { address, collectionAddress, price } });
});

export default app;

