import { Request, Response } from 'express'
import fs from 'fs'
import { ErrorBody } from '../../types/ErrorBody'
import { Pet } from '../../entities/Pet'

interface CreatePostReqBody {
    petPublicId: string,
    textContent?: string,
}

export type CreatePostRequest = Request<{}, {}, CreatePostReqBody>

interface CreatePostResBody {
    id: string,
    fileId: string,
    textContent?: string,
}

export type CreatePostResponse = Response<ErrorBody | CreatePostResBody>

export const createPost = async (req: CreatePostRequest, res: CreatePostResponse) =>
{
    try {
        if (!req.file?.path) {
            return res.status(500).send({ error: 'Upload was unsuccessful' })
        }

        const { newName } = await addExtension(req.file)

        const pet = await Pet.getByPublicId(req.body.petPublicId)
        const post = await pet.createPost({ textContent: req.body.textContent, mediaFileId: newName })

        return res.status(200).send({ id: post.id, fileId: post.mediaFileId, textContent: post.textContent })
    } catch (err) {
        if (err instanceof Error) res.status(500).send({ error: err.message ?? 'Something went wrong' })
    }
}

const addExtension = async (file: Express.Multer.File) => 
{
    const extension = file.originalname.split('.').at(-1)
    const newName = `${file.filename}.${extension}`
    await fs.promises.rename(file.path, `${file.path}.${extension}`)
    return { newName }
}