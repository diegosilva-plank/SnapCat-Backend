import { Router } from 'express'
import multer from 'multer'
import { controllers } from '../controllers'

export const petRoutes = Router()

petRoutes.route('/create').post(multer({ dest: 'tmp/uploads/' }).single('profilePicture'), controllers.pet.createPet)
petRoutes.route('/delete/:nickname').delete(controllers.pet.deletePet)
petRoutes.route('/get').get(controllers.pet.getAllPets)
petRoutes.route('/get/:nickname').get(controllers.pet.getPet)
petRoutes.route('/posts/:nickname').get(controllers.pet.getPostsFromPets)