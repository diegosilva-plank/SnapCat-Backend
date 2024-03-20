import { getAllPets } from "./pet/getAllPets"
import { getPostsFromPet } from "./pet/getPostsFromPet"
import { getAllPosts } from "./post/getAllposts"

export const resolvers = {
  Query: {
    test: () => 'Hello, world!',
    posts: getAllPosts,
    pets: getAllPets,
    postsOfPet: getPostsFromPet,
  }
}