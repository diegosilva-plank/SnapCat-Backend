import { Describe } from '../../../abstractions/Test/Describe'
import { petRepositoryTets } from '../implementations/PetRepository/tests'
import { postRepositoryTets } from '../implementations/PostRepository/tests'

const describes =
[
    postRepositoryTets,
    petRepositoryTets,
]

export const repositoriesTests = new Describe('Repositories', describes)