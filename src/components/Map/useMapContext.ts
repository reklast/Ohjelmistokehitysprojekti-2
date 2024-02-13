import { useContext } from 'react'

import { MapContext } from './MapContextProvider'

const useMapContext = () => {
  const mapInstance = useContext(MapContext)
  const map = mapInstance?.map
  const setMap = mapInstance?.setMap
  const centerCard = mapInstance?.centerCard

  return { map, setMap, centerCard }
}

export default useMapContext
