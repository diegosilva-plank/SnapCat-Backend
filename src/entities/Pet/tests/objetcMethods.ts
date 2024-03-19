import { v4 } from 'uuid'
import { IPetParams, Pet } from '..'
import { Describe } from '../../../abstractions/Test/Describe'
import { Test } from '../../../abstractions/Test/Test'
import { config } from '../../../config'
import { copyImageToUploads } from '../../../database/Bucket/tests/copyImageToUploads'
import fs from 'fs'

const tests =
[
    new Test('Download profile picture from pet', async () => {
        await copyImageToUploads(config.TEST_FILE_NAME)
        const petParams: IPetParams = {
            name: 'test',
            publicId: v4(),
            profilePictureId: config.TEST_FILE_NAME,
        }
        const pet = await Pet.create(petParams)
        await pet.downloadProfilePic()
        const originalPath = `${config.PUBLIC_PATH}/${config.TEST_FILE_NAME}`
        const downloadedPath = `${config.DOWNLOADS_PATH}/${config.TEST_FILE_NAME}`
        const original = await fs.promises.readFile(originalPath)
        const downloaded = await fs.promises.readFile(downloadedPath)
        expect(original.compare(downloaded)).toBe(0)
        if (fs.existsSync(downloadedPath))
            await fs.promises.unlink(downloadedPath)
    }),

    new Test('Check if downloaded file was deleted after test', () => {
        const downloadedPath = `${config.DOWNLOADS_PATH}/${config.TEST_FILE_NAME}`
        expect(fs.existsSync(downloadedPath)).toBe(false)
    }),

    new Test('Delete pet', async () => {
        await copyImageToUploads(config.TEST_FILE_NAME)
        const petParams: IPetParams = {
            name: 'Test',
            publicId: v4(),
            profilePictureId: config.TEST_FILE_NAME,
        }
        const pet = await Pet.create(petParams)
        await pet.delete()
        const retrievedPets = await Pet.getAll()
        expect(retrievedPets.length).toBe(0)
    })
]

export const objectMethodsTests = new Describe('Object methods tests', tests)