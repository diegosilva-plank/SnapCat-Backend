export class Test 
{
    constructor(public description: string, public test: () => void) {
        if (description === '') throw new Error('A test must have a description')
    }
}