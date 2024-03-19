import { Pet } from '../../entities/Pet'
import { IPetInfo } from './types'

export const getPetInfo = async (pet: Pet) =>
{
    const { url } = await pet.downloadProfilePic()
    const petInfo: IPetInfo = {
        name: pet.name,
        nickname: pet.publicId,
        createdUTCDateTime: pet.createdUTCDateTime,
        profilePictureUrl: url,
    }
    return petInfo
}