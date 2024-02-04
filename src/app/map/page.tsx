import Head from 'next/head'
import dynamic from 'next/dynamic'

import Map from '@components/Map'

const DynamicCarousel = dynamic(() => import('@components/CarouselComponent/CarouselComponent'), {
  ssr: false,
})

const MapPage = () => (
  <div>
    <Head>
      <title>Map Example | Jumpstart your new leaflet mapping Project with next.js and typescript 🤩</title>
      <meta
        property="og:title"
        content="Map Example | Jumpstart your new leaflet mapping Project with next.js and typescript 🤩"
        key="title"
      />
      <meta
        name="description"
        content="next-leaflet-starter-typescript is an extensible next.js starter template for the leaflet-maps-react plugin. Written in typescript,
      visually enhanced by tailwind and lucide-react icons."
      />
    </Head>
    <Map />
    <DynamicCarousel />
  </div>
)

export default MapPage
