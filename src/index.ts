import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import ConnectToDatabase from './database/MongoDB'
import { routes } from './routes/routes'
import ApiKeyMiddleware from './middlewares/ApiKeyMiddleware'

config()
ConnectToDatabase.connect()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(ApiKeyMiddleware.verifyApiKey)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(routes)

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})
