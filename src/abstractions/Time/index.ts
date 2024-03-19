import { getCurrentTimeInUTC } from './implementations/getCurrentTimeInUTC'

export class Time 
{
    public static now = async () => await getCurrentTimeInUTC()
}