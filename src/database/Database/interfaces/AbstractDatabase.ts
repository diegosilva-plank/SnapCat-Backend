import { Bucket } from '../../Bucket/interfaces/Bucket'
import { Buckets } from '../../Bucket/interfaces/Buckets'

export abstract class AbstractDatabase 
{
    constructor() {}

    protected abstract connect: () => Promise<void>
    public abstract clear: () => Promise<void>
    public abstract disconnect: () => Promise<void>

    public setup = async () => {
        await this.connect()
        Buckets.setup()
    }
}