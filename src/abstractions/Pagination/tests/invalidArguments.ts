import { Pagination } from '..'
import { Describe } from '../../Test/Describe'
import { Test } from '../../Test/Test'

const validNumbers = [1, 2, 6, 50, 70, 100, 1000, 10000]
const negativeNumbers = validNumbers.map(number => -number)
const floatNumbers = [1.2, 7.3, 187.3, 3.52, .9]

const validNumbersTest = (numbersForPage: number[], numbersForItensPerPage: number[]) => {
    for (const itensPerPage of numbersForItensPerPage) {
        for (const page of numbersForPage) {
            const functionWithError = () => new Pagination({ page, itensPerPage })
            expect(functionWithError).toThrowError(`Invalid values for pagination. page: ${page}, itensPerPage: ${itensPerPage}`)       
        }
    }
}

const tests =
[
    new Test('Page number 0', () => {
        validNumbersTest([0], validNumbers)
    }),

    new Test('Page with negative number', () => {
        validNumbersTest(negativeNumbers, validNumbers)
    }),

    new Test('Page with float number', () => {
        validNumbersTest(floatNumbers, validNumbers)
    }),

    new Test('ItensPerPage with number 0', () => {
        validNumbersTest(validNumbers, [0])
    }),

    new Test('ItensPerPage with negative number', () => {
        validNumbersTest(validNumbers, negativeNumbers)
    }),

    new Test('ItensPerPage with float number', () => {
        validNumbersTest(validNumbers, floatNumbers)
    }),
]

export const invalidArguments = new Describe('Invalid arguments', tests)