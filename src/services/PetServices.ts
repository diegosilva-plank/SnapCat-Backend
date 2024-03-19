import { repositories } from '../database/repositories'
import { Pagination } from '../abstractions/Pagination'
import { Buckets } from '../database/Bucket/interfaces/Buckets'
import { Time } from '../abstractions/Time'
import { IPet } from '../interfaces/IPet'
import { Pet } from '../entities/Pet'
import fs from 'fs'
import { config } from '../config'
import { Post } from '../entities/Post'

export type IPetWithoutCreated = Omit<IPet, 'createdUTCDateTime'>

export class PetServices
{
    async create(params: IPetWithoutCreated) 
    {
        if(params.profilePictureId)
            await Buckets.profilePicture.uploadFile(params.profilePictureId)
        const date = await Time.now()
        const createdUTCDateTime = date.toISOString()
        const petPayload: IPet = { ...params, createdUTCDateTime }
        const petInterface = await repositories.pet.create(petPayload)
        const pet = new Pet(petInterface)
        return pet
    }

    async getAll(pagination?: Pagination)
    {
        const petInterfaces = await repositories.pet.get({}, pagination)
        const pets = petInterfaces.map(petInterface => new Pet(petInterface))
        return pets
    }

    async getById(id: string)
    {
        const petInterface: IPet = await repositories.pet.getById(id)
        const pet = new Pet(petInterface)
        return pet
    }

    async getByPublicId(publicId: string)
    {
        const petInterfaces: IPet[] = await repositories.pet.get({ publicId })
        const petInterface = petInterfaces[0]
        const pet = new Pet(petInterface)
        return pet
    }

    async getPostsFromPet(id: string, pagination?: Pagination)
    {
        const postInterfaces = await repositories.post.get({ petId: id }, pagination)
        const posts = postInterfaces.map(postInterface => new Post(postInterface))
        return posts
    }

    async deleteById(id: string) 
    {
        const pet = await repositories.pet.getById(id)
        await repositories.post.delete({ petId: id })
        if (pet.profilePictureId) 
            await Buckets.profilePicture.deleteFile(pet.profilePictureId)
        await repositories.pet.delete({ id })
    }

    async downloadProfilePic(id: string)
    {
        const pet = await repositories.pet.getById(id)
        if (!fs.existsSync(config.DOWNLOADS_PATH)) fs.mkdirSync(config.DOWNLOADS_PATH)
        if (pet.profilePictureId && !fs.existsSync(`${config.DOWNLOADS_PATH}/${pet.profilePictureId}`)) 
            await Buckets.profilePicture.downloadFile(pet.profilePictureId, config.DOWNLOADS_PATH)
        return { url: `${config.APP_URL}/static/${pet.profilePictureId}` }
    }
}