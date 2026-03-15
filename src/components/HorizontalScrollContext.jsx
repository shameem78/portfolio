import { createContext, useContext } from 'react'

const HorizontalScrollContext = createContext(null)

export const useHorizontalScroll = () => useContext(HorizontalScrollContext)

export default HorizontalScrollContext
