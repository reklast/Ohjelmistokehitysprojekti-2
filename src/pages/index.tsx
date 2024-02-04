import { Leaf } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'

import EventsAPI from '@pages/EventsAPI'
import FinApi from '@pages/FinApi'
import PlacesAPI from '@pages/PlacesAPI'

import NavMenu from '@components/common/NavMenu'

import { AppConfig } from '@lib/AppConfig'

const Home = () => {
  const [fetchData, setFetchData] = useState(false)
  const [data, setData] = useState(null)
  const handleButtonClick = () => {
    setFetchData(true)
  }

  return (
    <div className="container mx-auto max-w-2xl max-md:max-w-none p-3">
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <NavMenu />
        </div>
      </section>
      <div>
        <FinApi />
      </div>

      <PlacesAPI data={data} setData={setData} />
    </div>
  )
}

export default Home
