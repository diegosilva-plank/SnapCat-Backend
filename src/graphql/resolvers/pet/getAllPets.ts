import { getPetInfo } from "../../../controllers/PetController/utils"
import { Pet } from "../../../entities/Pet"

export const getAllPets = async () => 
{
  const pets = await Pet.getAll()
  const petInfoPromises = pets.map(pet => getPetInfo(pet))
  const petInfos = await Promise.all(petInfoPromises)
  return petInfos
}