import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('*', cors({
  origin: ['https://sokushuu.de', 'https://www.sokushuu.de', 'http://localhost:5173'],
  allowHeaders: ['Content-Type'],
  allowMethods: ['GET', 'POST'],
}))

app.get('/', (c) => c.text('Hello World'))

app.post('/api/email/submit', async (c) => {
  const { email } = await c.req.json()

  if (!email) {
    return c.json({ error: 'Email is required' }, 400)
  }

  const { success } = await c.env.DB.prepare('INSERT INTO waitlists (email) VALUES (?)').bind(email).run()
  if (success) {
    c.status(201)
    return c.json({ success: true })
  } else {
    c.status(500)
    return c.json({ error: 'Failed to insert email' })
  }
})

export default app