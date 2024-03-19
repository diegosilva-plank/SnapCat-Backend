import { v4 } from 'uuid'
import { IPostParams, Post } from '..'
import { Describe } from '../../../abstractions/Test/Describe'
import { Test } from '../../../abstractions/Test/Test'
import { config } from '../../../config'
import { copyImageToUploads } from '../../../database/Bucket/tests/copyImageToUploads'
import fs from 'fs'

const tests =
[
    new Test('Download media from post', async () => {
        await copyImageToUploads(config.TEST_FILE_NAME)
        const postParams: IPostParams = {
            mediaFileId: config.TEST_FILE_NAME,
            petId: v4(),
        }
        const post = await Post.create(postParams)
        await post.download()
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

    new Test('Delete post', async () => {
        await copyImageToUploads(config.TEST_FILE_NAME)
        const postParams: IPostParams = {
            mediaFileId: config.TEST_FILE_NAME,
            petId: v4(),
        }
        const post = await Post.create(postParams)
        await post.delete()
        const retrievedPosts = await Post.getAll()
        expect(retrievedPosts.length).toBe(0)
    })
]

export const objectMethodsTests = new Describe('Object methods tests', tests)