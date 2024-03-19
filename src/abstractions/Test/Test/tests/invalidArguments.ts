import { Test } from "..";
import { Describe } from "../../Describe";

const tests =
[
    new Test('Should not allow an empty description', () => {
        const functionWithError = () => new Test('', () => {})
        expect(functionWithError).toThrowError('A test must have a description')
    })
]

export const invalidArguments = new Describe('Invalid Arguments', tests)