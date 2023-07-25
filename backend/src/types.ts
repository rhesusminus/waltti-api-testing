import { CITIES } from './constants'

type ObjectValues<T> = T[keyof T]

export type City = ObjectValues<typeof CITIES>
