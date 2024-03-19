import { BucketDB } from '../implementations/BucketDB'
import { createBucket } from '../implementations/createBucket'
import { BucketType } from '../implementations/types'

export abstract class Bucket
{
    protected name: string
    protected bucket: BucketType

    constructor(name: string) {
        this.name = name
        this.bucket = createBucket(this.name)
    }

    public abstract uploadFile: (fileId: string) => Promise<void>
    public abstract downloadFile: (name: string, destinyDir: string) => Promise<void>
    public abstract deleteFile: (fileId: string) => Promise<void>
}