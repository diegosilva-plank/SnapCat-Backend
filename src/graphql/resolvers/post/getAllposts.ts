import { IPetInfo } from "../../../controllers/PetController/types"
import { getPetInfo } from "../../../controllers/PetController/utils"
import { Pet } from "../../../entities/Pet"
import { Post } from "../../../entities/Post"

interface IPostInfo {
  createdUTCDateTime: string,
  mediaUrl: string,
  pet: IPetInfo,
  textContent?: string,
}

export const getAllPosts = async () =>
{
    const posts = await Post.getAll()
    const postInfoPromises = posts.map(post => getPostInfo(post))
    const postInfos = await Promise.all(postInfoPromises)
    return postInfos
}

const getPostInfo = async (post: Post) =>
{
    const pet = await Pet.get(post.petId)
    const petInfo = await getPetInfo(pet)
    const { url } = await post.download()
    const postInfo: IPostInfo = {
        createdUTCDateTime: post.createdUTCDateTime,
        mediaUrl: url,
        pet: petInfo,
        textContent: post.textContent,
    }
    return postInfo
}