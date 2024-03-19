import { Describe } from '../../../abstractions/Test/Describe'
import { bucketMethodsTests } from './bucketTests'
import { copyImageToUploadsTests } from './copyImageToUploads'

const describes =
[
    copyImageToUploadsTests,
    bucketMethodsTests,
]

export const bucketTests = new Describe('Bucket tests', describes)