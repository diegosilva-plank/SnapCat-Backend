import { Describe } from "..";
import { Test } from "../../Test";

const tests = 
[
    new Test('Should not allow an empty description', () => {
        const functionWithError = () => new Describe('', [new Test('test', () => {})])
        expect(functionWithError).toThrowError('A test must have a description')
    }),

    new Test('Must have a least one test', () => {
        const functionWithError = () => new Describe('test', [])
        expect(functionWithError).toThrowError('You must have a least one test')
    }),

    new Test('Children with wrong type', () => {
        const functionWithError = () => new Describe('test', [{ description: 'hello' } as Test])
        expect(functionWithError).toThrowError(`Type of children doesn't match neither Describe nor Test`)
    })
]

export const invalidArguments = new Describe('Invalid arguments', tests)