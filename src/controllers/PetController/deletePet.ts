import { Request, Response } from 'express'
import { ErrorBody } from '../../types/ErrorBody'
import { Pet } from '../../entities/Pet'

interface DeletePetReqParams {
    nickname: string
}

export type DeletePetRequest = Request<DeletePetReqParams, {}, {}>

interface DeletePetResBody {
    name: string,
    nickname: string,
    profilePictureId?: string,
}

export type DeletePetResponse = Response<ErrorBody | DeletePetResBody>

export const deletePet = async (req: DeletePetRequest, res: DeletePetResponse) =>
{
    try {
        const pet = await Pet.getByPublicId(req.params.nickname)
        await pet.delete()
        return res.status(200).send({ name: pet.name, nickname: pet.publicId, profilePictureId: pet.profilePictureId })
    } catch(err) {
        if (err instanceof Error)
            return res.status(500).send({ error: `${err.message}` ?? 'Something went wrong' })
    }
}