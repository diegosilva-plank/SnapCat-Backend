import { MockDB } from '../../../database/Database/implementations/MockDB'

export class IntegrationTest 
{
    constructor(public description: string, public test: (db: MockDB) => void) {
        if (description === '') throw new Error('A test must have a description')
    }
}