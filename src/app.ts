import express from 'express'
import { router } from './routes'
import { config } from './config'
import bodyParser from 'body-parser'
import cors from 'cors'

export const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.send({ satus: 'Main route' })
})

app.use(bodyParser.json())
app.use(router)

app.use('/static', express.static(config.DOWNLOADS_PATH))

