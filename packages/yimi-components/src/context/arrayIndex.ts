import { createContext } from 'react'
export interface ArrayIndexValue{
  index: number
}
const ArrayIndexContext = createContext<ArrayIndexValue>({index: 0})

export default ArrayIndexContext