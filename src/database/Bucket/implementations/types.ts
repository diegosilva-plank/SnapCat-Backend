import mongoose from 'mongoose'

// Please define the appropiate types according to the database
export type DatabaseType = mongoose.mongo.Db
export type BucketType =  mongoose.mongo.GridFSBucket 