import { Pet } from "../../../entities/Pet"

export const deletePet = async (_: unknown, args: { nickname: string }) =>
{
  const pet = await Pet.getByPublicId(args.nickname)
  await pet.delete()
}