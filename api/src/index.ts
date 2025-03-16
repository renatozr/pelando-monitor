import express from 'express'

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

app.get('/ping', (_req, res) => {
  res.send('Pong!')
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
