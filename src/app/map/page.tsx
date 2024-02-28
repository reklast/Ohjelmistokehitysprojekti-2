import dynamic from 'next/dynamic'
import Head from 'next/head'

import Map from '@components/Map'



const MapPage = () => (
  <div>
    <Head>
      <title>Helsinki Area Sights App</title>
      <meta
        property="og:title"
        content="This is Helsinki Guide to seeing the sights and places to see in Helsinki Metropolitan area."
        key="title"
      />
      <meta
        name="description"
        content="Click through the Helsinki sights with ease with our App."
      />
    </Head>

    <Map />
  
  </div>
)

export default MapPage
