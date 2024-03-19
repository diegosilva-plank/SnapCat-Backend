import { Describe } from '../../../abstractions/Test/Describe'
import { copyImageToUploadsWithNewIdTests } from './copyImageToUploadsWithNewId'
import { objectMethodsTests } from './objectMethods'
import { staticMethodsTests } from './staticMethodsTests'

const describes = 
[
    copyImageToUploadsWithNewIdTests,
    staticMethodsTests,
    objectMethodsTests,
]

export const postTests = new Describe('Post tests', describes)