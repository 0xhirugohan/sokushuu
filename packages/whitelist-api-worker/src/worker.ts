import { Hono } from 'hono'

const app = new Hono()

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