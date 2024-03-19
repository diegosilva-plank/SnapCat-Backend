import { Request, Response } from 'express'
import { IPagination, Pagination } from '../../abstractions/Pagination'
import { ErrorBody } from '../../types/ErrorBody'
import { Pet } from '../../entities/Pet'
import { IPostWithUrl, getPostsWithUrl } from '../PostController/utils'

interface GetPostsFromPetReqParams {
    nickname: string,
}

interface GetPostsFromPetReqBody {
    pagination?: IPagination,
}

export type GetPostsFromPetRequest = Request<GetPostsFromPetReqParams, {}, GetPostsFromPetReqBody>

interface GetPostsFromPetResBody {
    posts: IPostWithUrl[]
}

export type GetPostsFromPetResponse = Response<ErrorBody | GetPostsFromPetResBody>

export const getPostsFromPet = async (req: GetPostsFromPetRequest, res: GetPostsFromPetResponse) =>
{
    try {
        const pagination = req.body.pagination ? new Pagination(req.body.pagination) : undefined
        const pet = await Pet.getByPublicId(req.params.nickname)
        const posts = await pet.getPosts(pagination)
        const postsWithUrl = await getPostsWithUrl(posts)
        return res.status(200).send({ posts: postsWithUrl})
    } catch (err) {
        if (err instanceof Error) res.status(500).send({ error: err.message ?? 'Something went wrong' })
    }
}