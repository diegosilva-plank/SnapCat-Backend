
import { Describe } from '../../Test/Describe'
import { getCurrentTimeInUTCTest } from './getCurrentTimeInUTCTest.ts'

const describes = 
[
    getCurrentTimeInUTCTest
]

export const timeTests = new Describe('Time tests', describes)