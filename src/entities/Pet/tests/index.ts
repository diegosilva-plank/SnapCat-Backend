import { Describe } from '../../../abstractions/Test/Describe'
import { objectMethodsTests } from './objetcMethods'
import { staticMethodsTests } from './staticMethods'


const describes = 
[
    staticMethodsTests,
    objectMethodsTests,
]

export const petTests = new Describe('Post tests', describes)