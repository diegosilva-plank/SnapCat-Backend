import { v4 } from 'uuid'
import { services } from '../../services'
import { Pagination } from '../../abstractions/Pagination'
import { IPetWithoutCreated } from '../../services/PetServices'
import { IPet } from '../../interfaces/IPet'
import { IPostParams, Post } from '../Post'

export type IPetParams = Omit<IPetWithoutCreated, 'id'>
export type IPostParamsWithoutPetId = Omit<IPostParams, 'petId'>

export class Pet implements IPet 
{
    public static create = async (params: IPetParams) => 
    {
        const id = v4()
        const newPet = await services.pet.create({ id, ...params })
        return newPet
    }
    
    public static getAll = async (pagination?: Pagination) => await services.pet.getAll(pagination)
    public static getByPublicId = async (publicId: string) => await services.pet.getByPublicId(publicId)
    public static get = async (id: string) => await services.pet.getById(id)

    id: string
    publicId: string
    name: string
    profilePictureId?: string | undefined
    createdUTCDateTime: string

    constructor(params: IPet) {
        this.id = params.id
        this.publicId = params.publicId
        this.name = params.name
        this.profilePictureId = params.profilePictureId
        this.createdUTCDateTime = params.createdUTCDateTime
    }

    public createPost = async (params: IPostParamsWithoutPetId) => {
        const newPost = await Post.create({ ...params, petId: this.id })
        return newPost
    }

    public downloadProfilePic = async () => await services.pet.downloadProfilePic(this.id)
    public getPosts = async (pagination?: Pagination) => await services.pet.getPostsFromPet(this.id, pagination)
    public delete = async () => await services.pet.deleteById(this.id)
}