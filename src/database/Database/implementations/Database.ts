import mongoose from 'mongoose'
import { AbstractDatabase } from '../interfaces/AbstractDatabase'
import { config } from '../../../config'

export class Database extends AbstractDatabase 
{
    protected connect = async () => 
    {
        // Connect implementation here...
        await mongoose.connect(`${config.DB_CONNECTION}`)

        // Successfully connected
        console.log(`Connected to database`)
    }

    public disconnect = async () =>
    {
        // Disconnect implementation here...
        await mongoose.disconnect()
    }

    public clear = async () => 
    {
        // Clear implementation here...
        const collections = await mongoose.connection.db?.collections();
        if (!collections) return

        for (let collection of collections) {
            await collection.deleteMany({})
        }
    }

}