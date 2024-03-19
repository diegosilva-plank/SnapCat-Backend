import { Request, Response } from 'express'
import fs from 'fs'
import { ErrorBody } from '../../types/ErrorBody'
import { Pet } from '../../entities/Pet'

interface CreatePetReqBody {
    name: string,
    nickname: string,
}

export type CreatePetRequest = Request<{}, {}, CreatePetReqBody>

interface CreatePetResBody {
    id: string,
    fileId?: string,
    name: string,
    nickname: string,
}

export type CreatePetResponse = Response<ErrorBody | CreatePetResBody>

export const createPet = async (req: CreatePetRequest, res: CreatePetResponse) =>
{
    try {
        if (!req.file?.path) {
            return res.status(500).send({ error: 'Upload was unsuccessful' })
        }
        const filePath = req.file.path
        const extension = req.file.originalname.split('.').at(-1)
        const newName = `${req.file.filename}.${extension}`
        await fs.promises.rename(filePath, `${filePath}.${extension}`)
        const pet = await Pet.create({ name: req.body.name, publicId: req.body.nickname, profilePictureId: newName })
        return res.status(200).send({ id: pet.id, name: req.body.name, nickname: req.body.nickname, fileId: pet.profilePictureId })
    } catch (err) {
        if (err instanceof Error) res.status(500).send({ error: err.message ?? 'Something went wrong' })
    }
}