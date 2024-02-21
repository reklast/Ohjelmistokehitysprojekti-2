'use client'

import dynamic from 'next/dynamic'
import Head from 'next/head'

import Map from '@components/Map'
import EventsAPI from '@components/common/EventAPI'
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
   
    <Map>
      
    </Map>
  </div>
)

export default MapPage
