import { LatLngExpression } from 'leaflet'
import { Marker } from 'react-leaflet'

import { AppConfig } from '@components/lib/AppConfig'


import LeafletDivIcon from '../LeafletDivIcon'
import useMapContext from '../useMapContext'
import MarkerIconWrapper, { CustomMarkerProps } from './MarkerIconWrapper'

export const CustomMarker: React.FC<{
  position: CustomMarkerProps['position']
  icon: CustomMarkerProps['icon']
  color: CustomMarkerProps['color']
}> = ({ position, icon, color }: CustomMarkerProps) => {
  const { map, setSidePanel, setCurrentTarget, places } = useMapContext()

  const handleMarkerClick = () => {
    map?.panTo(position)
    const placeIndex = places?.findIndex(
      //@ts-ignore dunno how to fix it the right way sry
      (temp: { [x: string]: LatLngExpression }) =>
        temp['latitude'] === position[0] && temp['longitude'] === position[1],
    )
    setCurrentTarget!(places![placeIndex!])
    setSidePanel!(true)
  }

  return (
    <Marker
      position={position}
      icon={LeafletDivIcon({
        source: <MarkerIconWrapper color={color} icon={icon} />,
        anchor: [(AppConfig.ui.markerIconSize + 16) / 2, (AppConfig.ui.markerIconSize + 16) / 2],
      })}
      eventHandlers={{ click: handleMarkerClick }}
    />
  )
}
