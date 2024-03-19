import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

export const config = {
    PORT: process.env.PORT,
    DB_CONNECTION: process.env.DB_CONNECTION,
    PUBLIC_PATH: path.join(__dirname, '../public'),
    TEST_FILE_NAME: 'test.png',
    DOWNLOADS_PATH: path.join(__dirname, '../tmp/downloads'),
    UPLOADS_PATH: path.join(__dirname, '../tmp/uploads'),
    APP_URL: process.env.APP_URL,
    GET_CURRENT_TIME_IN_UTC_URL: 'https://timeapi.io/api/Time/current/zone?timeZone=Etc/Greenwich'
}