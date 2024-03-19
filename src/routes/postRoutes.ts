import { Router } from 'express'
import multer from 'multer'
import { controllers } from '../controllers'

export const postRoutes = Router()

postRoutes.route('/create').post(multer({ dest: 'tmp/uploads/' }).single('media'), controllers.post.createPost)
postRoutes.route('/delete/:id').delete(controllers.post.deletePost)
postRoutes.route('/get').get(controllers.post.getAllPosts)