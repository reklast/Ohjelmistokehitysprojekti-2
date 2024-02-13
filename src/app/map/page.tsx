import Head from 'next/head'
import dynamic from 'next/dynamic'

import Map from '@components/Map'

const DynamicCarousel = dynamic(() => import('@components/CarouselComponent/CarouselComponent'), {
  ssr: false,
})

const MapPage = () => (
  <div>
    
    <Map />
    <DynamicCarousel />
  </div>
)

export default MapPage
