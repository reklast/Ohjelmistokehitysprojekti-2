import { useContext } from 'react'

import { MapContext } from './MapContextProvider'

const useMapContext = () => {
  const mapInstance = useContext(MapContext)
  const map = mapInstance?.map
  const setMap = mapInstance?.setMap
  const category = mapInstance?.category
  const setCategory = mapInstance?.setCategory
  return { map, setMap, category, setCategory }
}

export default useMapContext
