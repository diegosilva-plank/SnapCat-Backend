import { Schema, model } from 'mongoose'
import { IPost } from '../../interfaces/IPost'

const postSchema = new Schema<IPost>({
    id: { type: String, unique: true, required: true },
    textContent: { type: String },
    mediaFileId: { type: String, unique: true, required: true },
    createdUTCDateTime: { type: String, required: true },
    petId: { type: String, required: true },
})

export const PostDB = model<IPost>('Post', postSchema)