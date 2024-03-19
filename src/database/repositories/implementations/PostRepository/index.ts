import { IPost } from '../../../../interfaces/IPost'
import { Pagination } from '../../../../abstractions/Pagination'
import { PostDB } from '../../../models/PostDB'
import { IRepository } from '../../interfaces/IRepository'
import { Document, Types } from 'mongoose'

const convertToIPost = (postDB: Document<unknown, {}, IPost> & IPost & {
    _id: Types.ObjectId;
}) : IPost => ({
    id: postDB.id,
    mediaFileId: postDB.mediaFileId,
    textContent: postDB.textContent,
    createdUTCDateTime: postDB.createdUTCDateTime,
    petId: postDB.petId
})

export class PostRepository implements IRepository<IPost>
{
    async create(post: IPost)
    {
        // Implementation here...
        const postDB = new PostDB()
        Object.assign(postDB, post)
        const created_postDB = await postDB.save()
        const created_post_interface = convertToIPost(created_postDB)
        return created_post_interface
    }
    
    async get(filter?: Partial<IPost>, pagination?: Pagination) 
    {
        // Implementation here...
        const limit = pagination ? { skip: pagination.getOffset(), limit: pagination.itensPerPage } : undefined
        const postsDB = await PostDB.find({...filter}, limit)
        const posts_interface = postsDB.map(postDB => convertToIPost(postDB))
        return posts_interface
    }

    async getById(id: string)
    {
        // Implementation here...
        return (await this.get({ id }))[0]
    }

    async getByIds(ids: string[], pagination?: Pagination) 
    {
        // Implementation here...
        const limit = pagination ? { skip: pagination.getOffset(), limit: pagination.itensPerPage } : undefined
        const postsDB = await PostDB.find({ id: { $in: ids } }, limit)
        const posts_interface = postsDB.map(postDB => convertToIPost(postDB))
        return posts_interface
    }

    async update(id: string, post: Partial<IPost>) 
    {
        // Implementation here...
        await PostDB.updateOne({ id }, post)
        const updatedPost = await this.getById(id)
        return updatedPost
    }

    async delete(filter?: Partial<IPost>) 
    {
        // Implementation here...
        await PostDB.deleteMany(filter)
    }

    async deleteByIds(ids: string[]) 
    {
        // Implementation here...
        await PostDB.deleteMany({ id: { $in: ids } })
    }
}