import { Pagination } from '..'
import { Describe } from '../../Test/Describe'
import { Test } from '../../Test/Test'

const validNumbers = [1, 2, 6, 50, 70, 100, 1000, 10000]

const tests = 
[
    new Test('Page one should have offset zero', () => {
        for (const itensPerPage of validNumbers) {
            const pagination = new Pagination({ page: 1, itensPerPage })
            expect(pagination.getOffset()).toBe(0)
        }
    }),

    new Test('Second page should have the number of itens per page as offset', () => {
        for (const itensPerPage of validNumbers) {
            const pagination = new Pagination({ page: 2, itensPerPage })
            expect(pagination.getOffset()).toBe(itensPerPage)
        }
    }),

    new Test('For 1 item per page, the offset is always the page minus 1', () => {
        for (const page of validNumbers) {
            const pagination = new Pagination({ page, itensPerPage: 1 })
            expect(pagination.getOffset()).toBe(page-1)
        }
    }),

    new Test('Generic instances and its expected results', () => {
        const cases = [
            { page: 4, itensPerPage: 50, result: 150 },
            { page: 3, itensPerPage: 100, result: 200 },
            { page: 7, itensPerPage: 20, result: 120 }
        ]
        for (const instance of cases) {
            const pagination = new Pagination({ page: instance.page, itensPerPage: instance.itensPerPage })
            expect(pagination.getOffset()).toBe(instance.result)
        }
    }),
]

export const offsetCalulation = new Describe('Offset calculation', tests)