import { config } from '../../../config'
import { GetCurrentTimeInUTCType } from '../interfaces/GetCurrentTimeInUTCType'
import axios from 'axios'

export const getCurrentTimeInUTC : GetCurrentTimeInUTCType = async () => 
{
    // implementation here...
    await Promise.resolve(process.nextTick(() => {}))
    const response = await axios.get(config.GET_CURRENT_TIME_IN_UTC_URL)
    const currentDate = new Date(`${response.data.dateTime}Z`)
    return currentDate
}