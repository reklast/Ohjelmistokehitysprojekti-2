import { LatLngExpression } from 'leaflet'
import { Shrink } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useMapEvents } from 'react-leaflet'

import { AppConfig } from '@components/lib/AppConfig'

import useMapContext from '../useMapContext'

[61.924100000000, 25.748200000000] as LatLngExpression

interface CenterButtonProps {
  center: LatLngExpression
  zoom: number
}

export const CenterButton: React.FC<{
  center: CenterButtonProps['center']
  zoom: CenterButtonProps['zoom']
}> = ({ center, zoom }: CenterButtonProps) => {
  const [isTouched, setIsTouched] = useState(false)
  const { map } = useMapContext()

  const touch = useCallback(() => {
    if (!isTouched && map) {
      setIsTouched(true)
    }
  }, [isTouched, map])

  useMapEvents({
    move() {
      touch()
    },
    zoom() {
      touch()
    },
  })

  const handleClick = useCallback(() => {
    if (!isTouched || !map) return

    map.flyTo(center, zoom)
    map.once('moveend', () => {
      setIsTouched(false)
    })
  }, [map, isTouched, zoom, center])

  return (
    <button
      type="button"
      style={{ zIndex: 400 }}
      className={`button absolute rounded top-2 right-3 p-2 shadow-md bg-white ${
        isTouched ? 'text-dark' : 'text-light'
      } `}
      onClick={() => handleClick()}
    >
      <Shrink size={AppConfig.ui.mapIconSize} />
    </button>
  )
}
