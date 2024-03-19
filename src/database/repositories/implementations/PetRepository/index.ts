
import { Pagination } from '../../../../abstractions/Pagination'
import { IPet } from '../../../../interfaces/IPet'
import { PetDB } from '../../../models/PetDB'
import { IRepository } from '../../interfaces/IRepository'
import { Document, Types } from 'mongoose'

const convertToIPet = (petDB: Document<unknown, {}, IPet> & IPet & {
    _id: Types.ObjectId;
}) : IPet => ({
    id: petDB.id,
    publicId: petDB.publicId,
    name: petDB.name,
    profilePictureId: petDB.profilePictureId,
    createdUTCDateTime: petDB.createdUTCDateTime,
})

export class PetRepository implements IRepository<IPet>
{
    async create(pet: IPet)
    {
        // Implementation here...
        const petDB = new PetDB()
        Object.assign(petDB, pet)
        const created_petDB = await petDB.save()
        const created_pet_interface = convertToIPet(created_petDB)
        return created_pet_interface
    }
    
    async get(filter?: Partial<IPet>, pagination?: Pagination) 
    {
        // Implementation here...
        const limit = pagination ? { skip: pagination.getOffset(), limit: pagination.itensPerPage } : undefined
        const petsDB = await PetDB.find({...filter}, limit)
        const pets_interface = petsDB.map(petDB => convertToIPet(petDB))
        return pets_interface
    }

    async getById(id: string)
    {
        // Implementation here...
        return (await this.get({ id }))[0]
    }

    async getByIds(ids: string[], pagination?: Pagination) 
    {
        // Implementation here...
        const limit = pagination ? { skip: pagination.getOffset(), limit: pagination.itensPerPage } : undefined
        const petsDB = await PetDB.find({ id: { $in: ids } }, limit)
        const pets_interface = petsDB.map(petDB => convertToIPet(petDB))
        return pets_interface
    }

    async update(id: string, pet: Partial<IPet>) 
    {
        // Implementation here...
        await PetDB.updateOne({ id }, pet)
        const updatedPost = await this.getById(id)
        return updatedPost
    }

    async delete(filter?: Partial<IPet>) 
    {
        // Implementation here...
        await PetDB.deleteMany(filter)
    }

    async deleteByIds(ids: string[]) 
    {
        // Implementation here...
        await PetDB.deleteMany({ id: { $in: ids } })
    }
}