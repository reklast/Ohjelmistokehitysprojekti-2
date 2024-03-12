import { useContext } from 'react'

import { MapContext } from './MapContextProvider'

const useMapContext = () => {
  const mapInstance = useContext(MapContext)
  const map = mapInstance?.map
  const setMap = mapInstance?.setMap
  const category = mapInstance?.category
  const setCategory = mapInstance?.setCategory
  const sidePanel = mapInstance?.sidePanel
  const setSidePanel = mapInstance?.setSidePanel
  const currentTarget = mapInstance?.currentTarget
  const setCurrentTarget = mapInstance?.setCurrentTarget
  const places = mapInstance?.places
  const setPlaces = mapInstance?.setPlaces

  return {
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
  }
}

export default useMapContext
