'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'

import SidePanel from '@components/SidePanel/SidePanel'
import MapTopBar from '@components/TopBar'

import { IPlace } from '@src/@types/places'

import { AppConfig } from '../lib/AppConfig'
import MarkerCategories, { Category, MarkerCategoryType } from '../lib/MarkerCategories'
import placeMarkers, { PlacesType } from '../lib/Places'
import MapContextProvider from './MapContextProvider'
import useLeafletWindow from './useLeafletWindow'
import useMapContext from './useMapContext'
import useMarkerData from './useMarkerData'

const LeafletCluster = dynamic(async () => (await import('./LeafletCluster')).LeafletCluster(), {
  ssr: false,
})
const CenterToMarkerButton = dynamic(async () => (await import('./ui/CenterButton')).CenterButton, {
  ssr: false,
})
const CustomMarker = dynamic(async () => (await import('./Marker')).CustomMarker, {
  ssr: false,
})
const LocateButton = dynamic(async () => (await import('./ui/LocateButton')).LocateButton, {
  ssr: false,
})
const LeafletMapContainer = dynamic(async () => (await import('./LeafletMapContainer')).LeafletMapContainer, {
  ssr: false,
})
const DynamicSidePanel = dynamic(() => import('@components/SidePanel/SidePanel'), {
  ssr: false,
})

const MapInner = () => {
  const { map, category, sidePanel, places, setPlaces } = useMapContext()
  const leafletWindow = useLeafletWindow()
  //const [places, setPlaces] = useState<any>([]) // define right type if we have time
  const [isDataLoading, setIsDataLoading] = useState(false)

  // assigning a value from the promise to state right at the start,
  // to prevent passing an empty value to "locations" key of marker object
  useEffect(() => {
    setIsDataLoading(true)
    placeMarkers(category)
      .then((value) => {
        setPlaces!(value);
        setIsDataLoading(false) // Data fetching completes, set loading false
      })
      .catch(e => {
        console.log('an error occured during API data fetching:', e)
        setIsDataLoading(false) // On error, also set loading false
      })
  }, [category])

  const {
    width: viewportWidth,
    height: viewportHeight,
    ref: viewportRef,
  } = useResizeDetector({
    refreshMode: 'debounce',
    refreshRate: 200,
  })

  const { clustersByCategory, allMarkersBoundCenter } = useMarkerData({
    locations: places,
    map,
    viewportWidth,
    viewportHeight,
  })

  const isLoading = !map || !leafletWindow || !viewportWidth || !viewportHeight || isDataLoading

  /** watch position & zoom of all markers */
  useEffect(() => {
    if (!allMarkersBoundCenter || !map) return

    const moveEnd = () => {
      map.setMinZoom(allMarkersBoundCenter.minZoom - 1)
      map.off('moveend', moveEnd)
    }

    map.setMinZoom(0)
    map.flyTo(allMarkersBoundCenter.centerPos, allMarkersBoundCenter.minZoom, { animate: false })
    map.once('moveend', moveEnd)
  }, [map, allMarkersBoundCenter])

  return (
    <div className="h-full w-full absolute overflow-hidden" ref={viewportRef}>
      <MapTopBar />
      <div
        className={`absolute w-full left-0 transition-opacity ${isLoading ? 'opacity-0' : 'opacity-1 '}`}
        style={{
          top: AppConfig.ui.topBarHeight,
          width: viewportWidth ?? '100%',
          height: viewportHeight ? viewportHeight - AppConfig.ui.topBarHeight : '100%',
        }}
      >
        {allMarkersBoundCenter && clustersByCategory && (
          <LeafletMapContainer
            center={allMarkersBoundCenter.centerPos}
            zoom={allMarkersBoundCenter.minZoom}
            maxZoom={AppConfig.maxZoom}
            minZoom={AppConfig.minZoom}
          >
            {!isLoading ? (
              <>
                <CenterToMarkerButton
                  center={allMarkersBoundCenter.centerPos}
                  zoom={allMarkersBoundCenter.minZoom}
                />
                <LocateButton />
                {Object.values(clustersByCategory).map(item => (
                  <LeafletCluster
                    key={item.category}
                    icon={MarkerCategories[item.category as Category].icon}
                    color={MarkerCategories[item.category as Category].color}
                    chunkedLoading
                  >
                    {item.markers.map((marker: any) => (
                      <CustomMarker
                        icon={MarkerCategories[marker.category as keyof MarkerCategoryType].icon}
                        color={MarkerCategories[marker.category as keyof MarkerCategoryType].color}
                        key={marker.id}
                        position={marker.position}
                      />
                    ))}
                  </LeafletCluster>
                ))}
              </>
            ) : (
              // eslint-disable-next-line react/jsx-no-useless-fragment
              <></>
            )}
          </LeafletMapContainer>
        )}
      </div>
    </div>
  )
}
const DynamicCarousel = dynamic(() => import('@components/CarouselComponent/CarouselComponent'), {
  ssr: false,
})
// pass through to get context in <MapInner>
const Map = () => (
  <MapContextProvider>
    <MapInner />
    <DynamicCarousel />
    <DynamicSidePanel />
  </MapContextProvider>
)

export default Map
