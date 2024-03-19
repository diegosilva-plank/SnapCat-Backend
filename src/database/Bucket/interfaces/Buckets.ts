import { BucketDB } from '../implementations/BucketDB'
import { DatabaseType } from '../implementations/types'

export interface BucketsParams
{
    database: DatabaseType
}

export class Buckets {
    public static media: BucketDB
    public static profilePicture: BucketDB
    public static setup = () => {
        Buckets.media = new BucketDB('media')
        Buckets.profilePicture = new BucketDB('profilePicture')
    }
}