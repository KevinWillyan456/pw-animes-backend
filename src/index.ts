import express from 'express'
import { config } from 'dotenv'

config()

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})
