import { v4 } from 'uuid'
import { IPetParams, Pet } from '..'
import { Describe } from '../../../abstractions/Test/Describe'
import { Test } from '../../../abstractions/Test/Test'
import { config } from '../../../config'
import { copyImageToUploads } from '../../../database/Bucket/tests/copyImageToUploads'
import { copyImageToUploadsWithNewId } from '../../Post/tests/copyImageToUploadsWithNewId'

const getRandomPetParamsWithPic = (profilePictureId: string) => {
    const petParams: IPetParams = {
        publicId: v4(),
        name: v4(),
        profilePictureId,
    }
    return petParams
}

const tests = 
[
    new Test('Create new pet keeps original params', async () => {
        await copyImageToUploads(config.TEST_FILE_NAME)
        const petParams = getRandomPetParamsWithPic(config.TEST_FILE_NAME)
        const pet = await Pet.create(petParams)
        expect(petParams.profilePictureId).toEqual(pet.profilePictureId)
    }),

    new Test('Create new pet and find it', async () => {
        await copyImageToUploads(config.TEST_FILE_NAME)
        const petParams = getRandomPetParamsWithPic(config.TEST_FILE_NAME)
        const pet = await Pet.create(petParams)
        const retrievedPet = await Pet.get(pet.id)
        expect(JSON.stringify(retrievedPet)).toBe(JSON.stringify(pet))
    }),

    new Test('Create new pet and find it by publicId', async () => {
        await copyImageToUploads(config.TEST_FILE_NAME)
        const petParams = getRandomPetParamsWithPic(config.TEST_FILE_NAME)
        const pet = await Pet.create(petParams)
        const retrievedPet = await Pet.getByPublicId(pet.publicId)
        expect(JSON.stringify(retrievedPet)).toBe(JSON.stringify(pet))
    }),

    new Test('Get all pets', async () => {
        const { newId: id1 } = await copyImageToUploadsWithNewId()
        const petParams1 = getRandomPetParamsWithPic(id1)
        const pet1 = await Pet.create(petParams1)
        const { newId: id2 } = await copyImageToUploadsWithNewId()
        const petParams2 = getRandomPetParamsWithPic(id2)
        const pet2 = await Pet.create(petParams2)
        const pets = [pet1, pet2]
        const petsStringfied = pets.map(pet => JSON.stringify(pet))
        const retrievedPets = await Pet.getAll()
        const retrievedPetsStringfied = retrievedPets.map(pet => JSON.stringify(pet))
        retrievedPetsStringfied.forEach(retrievedPet => {
            expect(petsStringfied.includes(retrievedPet)).toBe(true)
        })
    })
]

export const staticMethodsTests = new Describe('Static methods tests', tests)