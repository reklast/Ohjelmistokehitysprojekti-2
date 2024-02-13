'use client'

import { Carousel, CustomFlowbiteTheme } from 'flowbite-react'
import React, { ReactElement } from 'react'
import { use } from 'react'

import { IPlace } from '@src/@types/places'
import placesFetch from '@src/helpers/placesFetch'
import { VALIDATE_NO_SPACE_URL } from '@src/helpers/regexp'

function CarouselComponent() {
  const screenWidth: number = window.innerWidth
  let places = use(placesFetch("muistomerkki"))

  // custom styling of carousel control buttons
  const customTheme: CustomFlowbiteTheme['carousel'] = {
    control: {
      base: 'inline-flex h-8 w-8 items-center justify-center rounded-full bg-dark group-hover:bg-dark/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10',
    },
  }

  // determine number of slides based on the user window size
  const slidesNum = () => {
    if (screenWidth > 1500) return 5
    if (screenWidth < 1500) {
      if (screenWidth < 800) return 1

      if (screenWidth < 1015) return 2

      if (screenWidth < 1350) return 3
      return 4
    }
  }
  // slides sorting
  let dataArr: Array<Array<ReactElement>> = []

  // filter for values with present picture
  places = places.filter(
    (place: IPlace) => place.picture_url && place.picture_url.trim().match(VALIDATE_NO_SPACE_URL),
  )

  let k = slidesNum()!
  for (let i = 0; i < places.length; i += slidesNum()!) {
    const currentArr = places.slice(i, k)
    k += slidesNum()!

    const dataPack = currentArr.map((place: IPlace) => {
      return (
        <div key={place.id} className="flex hover:scale-105 transition w-[20rem] h-52">
          <div
            style={{ backgroundImage: `url(${place.picture_url})` }}
            className="rounded-2xl  h-[inherit] w-[inherit] bg-cover bg-top"
          >
            <div className="flex backdrop-brightness-50 rounded-2xl h-[inherit] text-white">
              <h1 className="text-xl mx-4 mt-4">{place.name_fi}</h1>
            </div>
          </div>
        </div>
      )
    })

    dataArr.push(dataPack)
  }

  // make array divisible by number of slides, to display elements correctly
  dataArr = dataArr.slice(0, dataArr.length - (dataArr.length % slidesNum()!))

  return (
    <div className="flex z-[1000] h-[30%] w-full fixed bottom-5">
      <Carousel slide={false} indicators={false} draggable={false} theme={customTheme}>
        {dataArr.map((dataPack, i) => (
          <div key={i} className="flex justify-center">
            <div className="flex justify-evenly items-center w-full space">
              {dataPack.map((data: any) => data)}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default CarouselComponent
