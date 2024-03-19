import { v4 } from 'uuid'
import { IPostParams, Post } from '..'
import { Describe } from '../../../abstractions/Test/Describe'
import { Test } from '../../../abstractions/Test/Test'
import { config } from '../../../config'
import { copyImageToUploads } from '../../../database/Bucket/tests/copyImageToUploads'
import { copyImageToUploadsWithNewId } from './copyImageToUploadsWithNewId'

const tests = 
[
    new Test('Create new post original params', async () => {
        await copyImageToUploads(config.TEST_FILE_NAME)
        const postParams: IPostParams = {
            mediaFileId: config.TEST_FILE_NAME,
            petId: v4(),
        }
        const post = await Post.create(postParams)
        expect(postParams.mediaFileId).toBe(post.mediaFileId)
    }),

    new Test('Create new post and find it', async () => {
        await copyImageToUploads(config.TEST_FILE_NAME)
        const postParams: IPostParams = {
            mediaFileId: config.TEST_FILE_NAME,
            petId: v4(),
        }
        const post = await Post.create(postParams)
        const retrievedPost = await Post.get(post.id)
        expect(JSON.stringify(retrievedPost)).toBe(JSON.stringify(post))
    }),

    new Test('Get all posts', async () => {
        const petId = v4()
        const { newId: id1 } = await copyImageToUploadsWithNewId()
        const post1 = await Post.create({ mediaFileId: id1, petId })
        const { newId: id2 } = await copyImageToUploadsWithNewId()
        const post2 = await Post.create({ mediaFileId: id2, petId })
        const posts = [post1, post2]
        const postsStringfied = posts.map(post => JSON.stringify(post))
        const retrievedPosts = await Post.getAll()
        const retrievedPostsStringfied = retrievedPosts.map(post => JSON.stringify(post))
        retrievedPostsStringfied.forEach(retrievedPost => {
            expect(postsStringfied.includes(retrievedPost)).toBe(true)
        })
    })
]

export const staticMethodsTests = new Describe('Static methods tests', tests)