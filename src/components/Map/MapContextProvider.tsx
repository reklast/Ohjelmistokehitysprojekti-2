import Leaflet from 'leaflet'
import { createContext, useCallback, useState } from 'react'

interface MapContextValues {
  map: Leaflet.Map | undefined;
  setMap: (e: Leaflet.Map | undefined) => void;
  centerCard: (lat: number, lng: number, zoom: number) => void;
}

export const MapContext = createContext<MapContextValues | undefined>(undefined)

interface MapContextProviderProps {
  children: React.ReactNode
}

const MapContextProvider = ({ children }: MapContextProviderProps) => {
  const [map, setMap] = useState<Leaflet.Map | undefined>(undefined)

  const centerCard = useCallback((lat: number, lng: number, zoom: number) => {
    console.log("Centering map to:", lat, lng, "with zoom:", zoom);
    if (map) {
      map.flyTo([lat, lng], zoom);
    }
  }, [map]);

  return <MapContext.Provider value={{ map, setMap, centerCard }}>{children}</MapContext.Provider>
}

export default MapContextProvider
