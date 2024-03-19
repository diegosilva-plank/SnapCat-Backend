import { createPet } from './createPet'
import { deletePet } from './deletePet'
import { getAllPets } from './getAllPets'
import { getPet } from './getPet'
import { getPostsFromPet } from './getPostsFromPet'

export const petController =
{
    createPet: createPet,
    deletePet: deletePet,
    getAllPets: getAllPets,
    getPet: getPet,
    getPostsFromPets: getPostsFromPet,
}
