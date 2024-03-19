import { v4 } from 'uuid'
import { Test } from '../../../../abstractions/Test/Test'
import { repositories } from '../..'
import { Describe } from '../../../../abstractions/Test/Describe'
import { IPet } from '../../../../interfaces/IPet'

const generatePet = (args?: { withProfilePictureId?: boolean }) => {
    const id = v4()
    const name = 'Sample pet name'
    const publicId = v4()
    const profilePictureId = args?.withProfilePictureId ? v4() : undefined
    const createdUTCDateTime = (new Date()).toUTCString()
    const pet: IPet = { id, name, publicId, createdUTCDateTime, profilePictureId }
    return pet
}

const tests =
[
    new Test('generatePet function without profilePictureId', () => {
        const pet = generatePet()
        expect(pet.id).toBeDefined()
        expect(pet.publicId).toBeDefined()
        expect(pet.profilePictureId).toBeUndefined()
    }),

    new Test('generatePet function with profilePictureId', () => {
        const pet = generatePet({ withProfilePictureId: true })
        expect(pet.id).toBeDefined()
        expect(pet.publicId).toBeDefined()
        expect(pet.profilePictureId).toBeDefined()
    }),

    new Test('create without profilePictureId', async () => {
        const pet = generatePet()
        await repositories.pet.create(pet)
        const newPet = await repositories.pet.getById(pet.id)
        expect(newPet).toEqual(pet)
    }),

    new Test('create with profilePictureId', async () => {
        const pet = generatePet({ withProfilePictureId: true })
        await repositories.pet.create(pet)
        const newPet = await repositories.pet.getById(pet.id)
        expect(newPet).toEqual(pet)
    }),

    new Test('update profilePictureId', async () => {
        const pet = generatePet()
        await repositories.pet.create(pet)
        const updatedPet = await repositories.pet.update(pet.id, { profilePictureId: 'new profilePictureId' })
        const { profilePictureId: petMediaFileId, ...petRest } = pet
        const { profilePictureId: updatedPetMediaFileId, ...updatedPetRest } = updatedPet
        expect(petRest).toEqual(updatedPetRest)
        expect(updatedPet.profilePictureId).toBe('new profilePictureId')
    }),

    new Test('update name', async () => {
        const pet = generatePet({ withProfilePictureId: true })
        await repositories.pet.create(pet)
        const updatedPet = await repositories.pet.update(pet.id, { name: 'new name' })
        const { name: petTextContent, ...petRest } = pet
        const { name: updatedPetTextContent, ...updatedPetRest } = updatedPet
        expect(petRest).toEqual(updatedPetRest)
        expect(updatedPet.name).toBe('new name')
    }),

    new Test('get', async () => {
        const pets = [generatePet(), generatePet()]
        for (const pet of pets)
            await repositories.pet.create(pet)
        const retrievedPets = await repositories.pet.get({ publicId: pets[0].publicId })
        expect(retrievedPets.length).toBe(1)
        expect(retrievedPets[0]).toEqual(pets[0])
    }),

    new Test('getByIds', async () => {
        const pets = [generatePet(), generatePet(), generatePet()]
        for (const pet of pets) 
            await repositories.pet.create(pet)
        const retrievedPets = await repositories.pet.getByIds([pets[0].id, pets[2].id])
        expect(retrievedPets.length).toBe(2)
        expect(retrievedPets).toEqual(expect.arrayContaining([pets[0], pets[2]]))
    }),

    new Test('delete', async () => {
        const pet = generatePet()
        await repositories.pet.create(pet)
        await repositories.pet.delete({ publicId: pet.publicId })
        const retrievedPets = await repositories.pet.get({ id: pet.id })
        expect(retrievedPets.length).toBe(0)
    }),

    new Test('delete by ids', async () => {
        const pets = [generatePet(), generatePet(), generatePet()]
        for (const pet of pets) 
            await repositories.pet.create(pet)
        await repositories.pet.deleteByIds([pets[0].id, pets[2].id])
        const retrievedPets = await repositories.pet.get()
        expect(retrievedPets.length).toBe(1)
    })
]

export const petRepositoryTets = new Describe('Pet Repository Tests', tests)
