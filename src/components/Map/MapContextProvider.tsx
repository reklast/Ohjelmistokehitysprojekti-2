import Leaflet from 'leaflet'
import { createContext, use, useCallback, useState } from 'react'

import { PlacesType } from '@components/lib/Places'

import { IPlace } from '@src/@types/places'
import placesFetch from '@src/helpers/placesFetch'

interface MapContextValues {
  map: Leaflet.Map | undefined
  setMap: (e: Leaflet.Map | undefined) => void
  category: string | undefined
  setCategory: (e: string | undefined) => void
  sidePanel: boolean
  setSidePanel: (e: boolean) => void
  currentTarget: IPlace | undefined
  setCurrentTarget: (e: IPlace | undefined) => void
  places: PlacesType | undefined
  setPlaces: (e: PlacesType | undefined) => void
}

export const MapContext = createContext<MapContextValues | undefined>(undefined)

interface MapContextProviderProps {
  children: React.ReactNode
}

const MapContextProvider = ({ children }: MapContextProviderProps) => {
  const [map, setMap] = useState<Leaflet.Map | undefined>(undefined)
  const [category, setCategory] = useState<string>()
  const [sidePanel, setSidePanel] = useState<boolean>(false)
  const [currentTarget, setCurrentTarget] = useState<IPlace | undefined>(undefined)
  const [places, setPlaces] = useState<PlacesType | undefined>()

  return (
    <MapContext.Provider
      value={{
        map,
        setMap,
        category,
        setCategory,
        sidePanel,
        setSidePanel,
        currentTarget,
        setCurrentTarget,
        places,
        setPlaces,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}

export default MapContextProvider
