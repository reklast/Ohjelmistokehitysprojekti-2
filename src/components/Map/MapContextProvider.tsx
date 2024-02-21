import Leaflet from 'leaflet'
import { createContext, useCallback, useState } from 'react'

interface MapContextValues {
  map: Leaflet.Map | undefined;
  setMap: (e: Leaflet.Map | undefined) => void;
  category: string | undefined;
  setCategory: (e: string | undefined) => void
}

export const MapContext = createContext<MapContextValues | undefined>(undefined)

interface MapContextProviderProps {
  children: React.ReactNode
}

const MapContextProvider = ({ children }: MapContextProviderProps) => {
  const [map, setMap] = useState<Leaflet.Map | undefined>(undefined)
  const [category, setCategory] = useState<string>()

  return <MapContext.Provider value={{ map, setMap, category, setCategory }}>{children}</MapContext.Provider>
}

export default MapContextProvider
