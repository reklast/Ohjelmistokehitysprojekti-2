import { LatLngExpression, Map } from 'leaflet'
import { useEffect, useMemo, useState } from 'react'

import useLeafletWindow from '@components/Map/useLeafletWindow'

import { AppConfig } from '@components/lib/AppConfig'
import { PlacesClusterType, PlacesType } from '@components/lib/Places'

interface useMapDataValues {
  locations?: PlacesType
  map?: Map
  viewportWidth?: number
  viewportHeight?: number
}

interface allMarkerPosValues {
  minZoom: number
  centerPos: LatLngExpression
}

const useMarkerData = ({ locations, map, viewportWidth, viewportHeight }: useMapDataValues) => {
  const leafletWindow = useLeafletWindow()

  const [allMarkersBoundCenter, setAllMarkersBoundCenter] = useState<allMarkerPosValues>({
    minZoom: AppConfig.minZoom - 1,
    centerPos: AppConfig.baseCenter,
  })

  // get bounds of all markers
  const allMarkerBounds = useMemo(() => {
    if (!leafletWindow || !locations) return undefined

    const coordsSum: LatLngExpression[] = []
    locations.forEach(item => {
      coordsSum.push(item.position)
    })
    return leafletWindow.latLngBounds(coordsSum)
  }, [leafletWindow, locations])

  const clustersByCategory = useMemo(() => {
    if (!locations) return undefined
    const groupedLocations = locations.reduce<PlacesClusterType>((acc, location) => {
      const { category } = location
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(location)
      return acc
    }, {})

    const mappedClusters = Object.keys(groupedLocations).map(key => ({
      category: Number(key),
      markers: groupedLocations[key],
    }))

    return mappedClusters
  }, [locations])

  // auto resize map to fit all markers on viewport change
  // useMemo will not work here, because we need to update the map size after the viewport size changes
  useEffect(() => {
    if (!allMarkerBounds || !leafletWindow || !map) return

    const el = map.invalidateSize()
    if (!el) return
    setAllMarkersBoundCenter({
      minZoom: map.getBoundsZoom(allMarkerBounds),
      centerPos: [allMarkerBounds.getCenter().lat, allMarkerBounds.getCenter().lng],
    })
  }, [allMarkerBounds, viewportWidth, viewportHeight])

  return { clustersByCategory, allMarkersBoundCenter }
}

export default useMarkerData
