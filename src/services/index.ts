import { PetServices } from './PetServices'
import { PostServices } from './PostServices'

export const services = {
    post: new PostServices(),
    pet: new PetServices(),
}