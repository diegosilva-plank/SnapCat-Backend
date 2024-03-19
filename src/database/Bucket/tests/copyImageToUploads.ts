import { Describe } from '../../../abstractions/Test/Describe'
import { Test } from '../../../abstractions/Test/Test'
import { config } from '../../../config'
import fs from 'fs'

export const copyImageToUploads = async (fileName: string) => {
    const originalPath = `${config.PUBLIC_PATH}/${fileName}`
    const uploadedPath = `${config.UPLOADS_PATH}/${fileName}`
    await fs.promises.copyFile(originalPath, uploadedPath)
}

const testImageName = config.TEST_FILE_NAME
const testImageOriginalPath = `${config.PUBLIC_PATH}/${testImageName}`
const testImageUploadedPath = `${config.UPLOADS_PATH}/${testImageName}`

const tests =
[
    new Test('Test file exists', () => {
        expect(fs.existsSync(testImageOriginalPath)).toBe(true)
    }),

    new Test('Copied test file exists', async () => {
        await copyImageToUploads(testImageName)
        expect(fs.existsSync(testImageUploadedPath)).toBe(true)
        if (fs.existsSync(testImageUploadedPath))
            await fs.promises.unlink(testImageUploadedPath)
    }),

    new Test('Copied test file is the same', async () => {
        await copyImageToUploads(testImageName)
        const original = await fs.promises.readFile(testImageOriginalPath)
        const copied = await fs.promises.readFile(testImageUploadedPath)
        expect(original.compare(copied)).toBe(0)
        if (fs.existsSync(testImageUploadedPath))
            await fs.promises.unlink(testImageUploadedPath)
    }),

    new Test('Check if copied file was deleted after tests', () => {
        expect(fs.existsSync(testImageUploadedPath)).toBe(false)
    })
]

export const copyImageToUploadsTests = new Describe('copyImageToUploads', tests)