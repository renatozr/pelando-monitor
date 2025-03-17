import express from 'express'
import apiRouter from './routers/api'

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use('/api', apiRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
