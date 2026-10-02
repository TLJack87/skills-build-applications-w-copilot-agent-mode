import express from 'express'
import './config/database.js'
import apiRouter from './routes/api.js'

const app = express()
const port = Number(process.env.PORT ?? 8000)
const baseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000'

app.use(express.json())
app.use(apiRouter)

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API available at ${baseUrl}`)
})