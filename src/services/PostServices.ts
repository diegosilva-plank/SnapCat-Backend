import { config } from '../config'
import { repositories } from '../database/repositories'
import { Post } from '../entities/Post'
import { IPost } from '../interfaces/IPost'
import { Pagination } from '../abstractions/Pagination'
import fs from 'fs'
import { Buckets } from '../database/Bucket/interfaces/Buckets'
import { Time } from '../abstractions/Time'

export type IPostWithoutCreated = Omit<IPost, 'createdUTCDateTime'>

export class PostServices
{
    async create(params: IPostWithoutCreated) 
    {
        await Buckets.media.uploadFile(params.mediaFileId)
        const date = await Time.now()
        const createdUTCDateTime = date.toISOString()
        const postPayload: IPost = { ...params, createdUTCDateTime }
        const postInterface = await repositories.post.create(postPayload)
        const post = new Post(postInterface)
        return post
    }

    async download(id: string)
    {
        const post = await repositories.post.getById(id)
        if (!fs.existsSync(config.DOWNLOADS_PATH)) fs.mkdirSync(config.DOWNLOADS_PATH)
        if (post.mediaFileId && !fs.existsSync(`${config.DOWNLOADS_PATH}/${post.mediaFileId}`)) 
            await Buckets.media.downloadFile(post.mediaFileId, config.DOWNLOADS_PATH)
        return { url: `${config.APP_URL}/static/${post.mediaFileId}` }
    }

    async getAll(pagination?: Pagination)
    {
        const postInterfaces = await repositories.post.get({}, pagination)
        const posts = postInterfaces.map(postInterface => new Post(postInterface))
        return posts
    }

    async getById(id: string)
    {
        const postInterface = await repositories.post.getById(id)
        const post = new Post(postInterface)
        return post
    }

    async deleteById(id: string) 
    {
        const post = await repositories.post.getById(id)
        if (post.mediaFileId) await Buckets.media.deleteFile(post.mediaFileId)
        await repositories.post.delete({ id })
    }
}