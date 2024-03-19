import { Describe } from '../../Test/Describe'
import { Test } from '../../Test/Test'
import { getCurrentTimeInUTC } from '../implementations/getCurrentTimeInUTC'

const tests =
[
    new Test('gets current time', async () => {
        const currentTimeString = await getCurrentTimeInUTC()
        const currentTime = new Date(currentTimeString)
        const now = new Date()
        const diffTime = Math.abs(now.getTime() - currentTime.getTime());
        expect(diffTime).toBeLessThan(1000)
    }),
]

export const getCurrentTimeInUTCTest = new Describe('get current time in UTC tests', tests)