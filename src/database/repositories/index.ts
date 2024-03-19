import { PetRepository } from './implementations/PetRepository'
import { PostRepository } from './implementations/PostRepository'

export const repositories = {
    post: new PostRepository(),
    pet: new PetRepository(),
}