'use client'

import { Carousel } from 'flowbite-react'
import React, { useState } from 'react'
import { use } from 'react'

import placesFetch from '@src/helpers/placesFetch';

import { IPlace } from '@src/@types/places';


function CarouselComponent() {
  const [display, setDisplay] = useState('Places')

  const places = use(placesFetch());

  return (
    <div className="flex h-10% z-50 bottom-0 fixed">
      <Carousel>{places.map((place: IPlace) => (<div>{place.name_fi}</div>))}</Carousel>
    </div>
  )
}

export default CarouselComponent
