import { Test } from '../Test'
import { useMockDB } from './useMockDB'

export class Describe
{
    public describe: () => void
    constructor(description: string, children: Describe[] | Test[]) 
    {
        if (description === '') throw new Error('A test must have a description')
        if (children.length == 0) throw new Error('You must have a least one test')

        if (children[0] instanceof Test) {
            const tests = children as Test[]
            const content = () => {
                tests.forEach(child => test(child.description, child.test))
            }
            this.describe = () => describe(description, content)
        } 
        else if (children[0] instanceof Describe) 
        {
            const describes = children as Describe[]
            const content = () => {
                describes.forEach(child => child.describe())
            }
            this.describe = () => describe(description, content)
        } 
        else 
        {
            throw new Error(`Type of children doesn't match neither Describe nor Test`)
        }
    }

    public integration = () => {
        useMockDB()
        this.describe()
    }
}