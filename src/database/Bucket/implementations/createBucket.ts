import mongoose from 'mongoose'
import { CreateBucketType } from '../interfaces/CreateBucketType'

export const createBucket: CreateBucketType = (name: string) => 
{
    // Implementation here...
    const db = mongoose.connection.db
    return new mongoose.mongo.GridFSBucket(db, { bucketName: name })
}
