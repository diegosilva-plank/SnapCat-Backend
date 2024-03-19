import { Describe } from '../../../abstractions/Test/Describe'
import { Test } from '../../../abstractions/Test/Test'
import { config } from '../../../config'
import { BucketDB } from '../implementations/BucketDB'
import { copyImageToUploads } from './copyImageToUploads'
import fs from 'fs'

const tests = 
[
    new Test('check if file is removed from uploads folder', async () => {
        await copyImageToUploads(config.TEST_FILE_NAME)
        const bucket = new BucketDB('test')
        await bucket.uploadFile(config.TEST_FILE_NAME)
        const uploadedPath = `${config.UPLOADS_PATH}/${config.TEST_FILE_NAME}`
        expect(fs.existsSync(uploadedPath))
    }),

    new Test('check if file is downloaded sucessfully', async () => {
        await copyImageToUploads(config.TEST_FILE_NAME)
        const bucket = new BucketDB('test')
        await bucket.uploadFile(config.TEST_FILE_NAME)
        await bucket.downloadFile(config.TEST_FILE_NAME,  config.DOWNLOADS_PATH)
        const originalPath = `${config.PUBLIC_PATH}/${config.TEST_FILE_NAME}`
        const downloadedPath = `${config.DOWNLOADS_PATH}/${config.TEST_FILE_NAME}`
        expect(fs.existsSync(downloadedPath)).toBe(true)
        const original = await fs.promises.readFile(originalPath)
        const downloaded = await fs.promises.readFile(downloadedPath)
        expect(downloaded.compare(original)).toBe(0)
        await fs.promises.unlink(downloadedPath)
    }),

    new Test('check if downloaded file is deleted after test', () => {
        const downloadedPath = `${config.DOWNLOADS_PATH}/${config.TEST_FILE_NAME}`
        expect(fs.existsSync(downloadedPath)).toBe(false)
    }),

    new Test('check if file is deleted', async () => {
        await copyImageToUploads(config.TEST_FILE_NAME)
        const bucket = new BucketDB('test')
        await bucket.uploadFile(config.TEST_FILE_NAME)
        await bucket.downloadFile(config.TEST_FILE_NAME, config.DOWNLOADS_PATH)
        const downloadedPath = `${config.DOWNLOADS_PATH}/${config.TEST_FILE_NAME}`
        await bucket.deleteFile(config.TEST_FILE_NAME)
        expect(fs.existsSync(downloadedPath)).toBe(false)
        const functionWithError = async () => {
            await bucket.downloadFile(config.TEST_FILE_NAME, config.DOWNLOADS_PATH)
        }
        await expect(functionWithError).rejects.toThrowError()
        expect(fs.existsSync(downloadedPath)).toBe(false)
    }),
]

export const bucketMethodsTests = new Describe('Bucket methods', tests)