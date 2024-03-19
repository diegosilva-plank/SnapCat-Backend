import { Request, Response } from 'express'
import { IPagination, Pagination } from '../../abstractions/Pagination'
import { ErrorBody } from '../../types/ErrorBody'
import { Pet } from '../../entities/Pet'
import { IPetInfo } from './types'
import { getPetInfo } from './utils'

interface GetAllPetsReqBody {
    pagination?: IPagination,
}

export type GetAllPetsRequest = Request<{}, {}, GetAllPetsReqBody>

interface GetAllPetsResBody {
    pets: IPetInfo[]
}

export type GetAllPetsResponse = Response<ErrorBody | GetAllPetsResBody>

export const getAllPets = async (req: GetAllPetsRequest, res: GetAllPetsResponse) =>
{
    try {
        const pagination = req.body.pagination ? new Pagination(req.body.pagination) : undefined
        const pets = await Pet.getAll(pagination)
        const petInfoPromises = pets.map(pet => getPetInfo(pet))
        const petInfos = await Promise.all(petInfoPromises)
        return res.status(200).send({ pets: petInfos })
    } catch (err) {
        if (err instanceof Error) res.status(500).send({ error: err.message ?? 'Something went wrong' })
    }
}