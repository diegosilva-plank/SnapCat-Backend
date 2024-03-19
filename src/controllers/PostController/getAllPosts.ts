import { Request, Response } from 'express'
import { IPagination, Pagination } from '../../abstractions/Pagination'
import { ErrorBody } from '../../types/ErrorBody'
import { Post } from '../../entities/Post'
import { IPetInfo } from '../PetController/types'
import { Pet } from '../../entities/Pet'
import { getPetInfo } from '../PetController/utils'

interface GetAllPostsReqBody {
    pagination?: IPagination,
}

export type GetAllPostsRequest = Request<{}, {}, GetAllPostsReqBody>

interface IPostInfo {
    createdUTCDateTime: string,
    mediaUrl: string,
    pet: IPetInfo,
    textContent?: string,
}

interface GetAllPostsResBody {
    posts: IPostInfo[]
}

export type GetAllPostsResponse = Response<ErrorBody | GetAllPostsResBody>

export const getAllPosts = async (req: GetAllPostsRequest, res: GetAllPostsResponse) =>
{
    try {
        const pagination = req.body.pagination ? new Pagination(req.body.pagination) : undefined
        const posts = await Post.getAll(pagination)
        const postInfoPromises = posts.map(post => getPostInfo(post))
        const postInfos = await Promise.all(postInfoPromises)
        return res.status(200).send({ posts: postInfos })
    } catch (err) {
        if (err instanceof Error) res.status(500).send({ error: err.message ?? 'Something went wrong' })
    }
}

const getPostInfo = async (post: Post) =>
{
    const pet = await Pet.get(post.petId)
    const petInfo = await getPetInfo(pet)
    const { url } = await post.download()
    const postInfo: IPostInfo = {
        createdUTCDateTime: post.createdUTCDateTime,
        mediaUrl: url,
        pet: petInfo,
        textContent: post.textContent,
    }
    return postInfo
}