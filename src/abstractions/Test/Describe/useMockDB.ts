import { MockDB } from '../../../database/Database/implementations/MockDB'

export const useMockDB = () => {
    const mock = new MockDB()

    beforeAll(async () => {
        await mock.setup()
    })

    afterEach(async () => {
        await mock.clear()
    })

    afterAll(async () => {
        await mock.disconnect()
    })

    return mock
}