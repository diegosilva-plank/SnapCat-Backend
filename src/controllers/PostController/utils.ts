import { Post } from '../../entities/Post'
import { IPost } from '../../interfaces/IPost'

export interface IPostWithUrl extends Omit<IPost, 'id' | 'petId' | 'mediaFileId'> {
    mediaUrl?: string
}

export const getPostsWithUrl = async (posts: Post[]) => 
{
    const postsWithUrl: IPostWithUrl[] = []
    for (const post of posts) {
        const { url } = await post.download()
        const postWithUrl: IPostWithUrl = {
            createdUTCDateTime: post.createdUTCDateTime,
            mediaUrl: url,
            textContent: post.textContent,
        }
        postsWithUrl.push(postWithUrl)
    }
    return postsWithUrl
}