import { Request, Response } from 'express'
import { Post } from '../../entities/Post'
import { ErrorBody } from '../../types/ErrorBody'

interface DeletePostReqParams {
    id: string
}

export type DeletePostRequest = Request<DeletePostReqParams, {}, {}>

interface DeletePostResBody {
    textContent?: string,
    mediaFileId: string
}

export type DeletePostResponse = Response<ErrorBody | DeletePostResBody>

export const deletePost = async (req: DeletePostRequest, res: DeletePostResponse) =>
{
    try {
        const post = await Post.get(req.params.id)
        await post.delete()
        return res.status(200).send({ textContent: post.textContent, mediaFileId: post.mediaFileId })
    } catch(err) {
        if (err instanceof Error)
            return res.status(500).send({ error: `${err.message}` ?? 'Something went wrong' })
    }
}