import { getPostsWithUrl } from "../../../controllers/PostController/utils"
import { Pet } from "../../../entities/Pet"

export const getPostsFromPet = async (_: unknown, args: { nickname: string }) =>
{
  const pet = await Pet.getByPublicId(args.nickname)
  const posts = await pet.getPosts()
  const postsWithUrl = await getPostsWithUrl(posts)
  return postsWithUrl
}