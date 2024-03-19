import { Request, Response } from 'express'
import { ErrorBody } from '../../types/ErrorBody'
import { Pet } from '../../entities/Pet'

interface GetPetReqParams {
    nickname: string
}

export type GetPetRequest = Request<GetPetReqParams, {}, {}>

interface GetPetResBody {
    name: string,
    nickname: string,
    createdUTCDateTime: string,
    profilePictureUrl?: string,
}

export type GetPetResponse = Response<ErrorBody | GetPetResBody>

export const getPet = async (req: GetPetRequest, res: GetPetResponse) =>
{
    try {
        const pet = await Pet.getByPublicId(req.params.nickname)
        const { url } = await pet.downloadProfilePic()
        return res.status(200).send({ name: pet.name, nickname: pet.publicId, createdUTCDateTime: pet.createdUTCDateTime, profilePictureUrl: url })
    } catch(err) {
        if (err instanceof Error)
            return res.status(500).send({ error: `${err.message}` ?? 'Something went wrong' })
    }
}