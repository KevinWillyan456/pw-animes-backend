import express from 'express'
import { config } from 'dotenv'
import ConnectToDatabase from './database/MongoDB'

config()
ConnectToDatabase.connect()

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})
