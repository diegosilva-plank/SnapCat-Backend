import { v4 } from 'uuid'
import { config } from '../../../config'
import { copyImageToUploads } from '../../../database/Bucket/tests/copyImageToUploads'
import fs from 'fs'
import { Test } from '../../../abstractions/Test/Test'
import { Describe } from '../../../abstractions/Test/Describe'

export const copyImageToUploadsWithNewId = async () => {
    await copyImageToUploads(config.TEST_FILE_NAME)
    const newId = `${v4()}.png`
    const oldPath = `${config.UPLOADS_PATH}/${config.TEST_FILE_NAME}`
    const newPath = `${config.UPLOADS_PATH}/${newId}`
    await fs.promises.rename(oldPath, newPath)
    return { newId } 
}

const tests =
[
    new Test('Copied test file exists', async () => {
        const { newId: id } = await copyImageToUploadsWithNewId()
        const uploadedPath = `${config.UPLOADS_PATH}/${id}`
        expect(fs.existsSync(uploadedPath)).toBe(true)
        if (fs.existsSync(uploadedPath))
            await fs.promises.unlink(uploadedPath)
    }),

    new Test('Copied test file is the same', async () => {
        const { newId: id } = await copyImageToUploadsWithNewId()
        const originalPath = `${config.PUBLIC_PATH}/${config.TEST_FILE_NAME}`
        const uploadedPath = `${config.UPLOADS_PATH}/${id}`
        const original = await fs.promises.readFile(originalPath)
        const copied = await fs.promises.readFile(uploadedPath)
        expect(original.compare(copied)).toBe(0)
        if (fs.existsSync(uploadedPath))
            await fs.promises.unlink(uploadedPath)
    }),

    new Test('Check if copied file was deleted after tests', async () => {
        const files = await fs.promises.readdir(config.UPLOADS_PATH)
        expect(files.length).toBe(1) // it still has .gitkeep file
    })
]

export const copyImageToUploadsWithNewIdTests = new Describe('copyImageToUploadsWithNewId tests', tests)