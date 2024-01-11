import express from 'express'
import { config } from 'dotenv'
import ConnectToDatabase from './database/MongoDB'
import { routes } from './routes/routes'

config()
ConnectToDatabase.connect()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(routes)

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})
