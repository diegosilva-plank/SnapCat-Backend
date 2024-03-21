import { deletePet } from "./pet/deletePet"
import { getAllPets } from "./pet/getAllPets"
import { getPostsFromPet } from "./pet/getPostsFromPet"
import { getAllPosts } from "./post/getAllPosts"

export const resolvers = {
  Query: {
    test: () => 'Hello, world!',
    posts: getAllPosts,
    pets: getAllPets,
    postsOfPet: getPostsFromPet,
  },

  Mutation: {
    deletePet: deletePet,
  }
}