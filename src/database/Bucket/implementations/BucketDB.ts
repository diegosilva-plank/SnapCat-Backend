import fs from 'fs'
import { Bucket } from '../interfaces/Bucket'
import { config } from '../../../config'
import stream from 'stream'
import mongoose from 'mongoose'

export class BucketDB extends Bucket {

    public uploadFile = async (fileId: string) => 
    {
        // implementation here...
        const path = `${config.UPLOADS_PATH}/${fileId}`
        await stream.promises.pipeline(
            fs.createReadStream(path),
            this.bucket.openUploadStream(fileId.toLocaleString(), {
                chunkSizeBytes: 1048576,
            })
        )
        await fs.promises.unlink(path)
    }

    public downloadFile = async (name: string, destinyDir: string) => 
    {
        // implementation here...
        const destinyPath = `${destinyDir}/${name}`
        try {
            await stream.promises.pipeline(
                this.bucket.openDownloadStreamByName(name),
                fs.createWriteStream(destinyPath)
            )
        } catch (err) {
            if (fs.existsSync(destinyPath))
                await fs.promises.unlink(destinyPath)
            throw err
        }
    }

    public deleteFile = async (fileId: string) => 
    {
        // implementation here...
        const path = `${config.DOWNLOADS_PATH}/${fileId}`
        if (fs.existsSync(path)) await fs.promises.unlink(path)
        const files = this.bucket.find({ filename: fileId })
        for await (const file of files) {
            this.bucket.delete(new mongoose.Types.ObjectId(file._id))
        }
    }
}