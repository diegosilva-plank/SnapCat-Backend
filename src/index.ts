import { app } from './app'
import { config } from './config'
import { db } from './database/Database'

const { PORT } = config

const run = async () => {
    await db.setup()
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}

run().catch((err) => console.error(err))