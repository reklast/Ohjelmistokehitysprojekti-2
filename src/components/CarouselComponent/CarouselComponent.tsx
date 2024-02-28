'use client'

import { Carousel, CustomFlowbiteTheme } from 'flowbite-react'
import React, { ReactElement, Suspense, useState, useEffect } from 'react'
import { use } from 'react'
import ImageWithFallback from '@components/ImageWithFallback/ImageWithFallback'
import placeholderImage from '@src/../public/placeholderImage.jpg';
import useMapContext from '@components/Map/useMapContext'

import { IPlace } from '@src/@types/places'
import { LatLngExpression } from 'leaflet'

import placesFetch from '@src/helpers/placesFetch'
import { VALIDATE_NO_SPACE_URL } from '@src/helpers/regexp'


function CarouselComponent() {
  const { map, category } = useMapContext();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  
  
  // custom styling of carousel control buttons
  const customTheme: CustomFlowbiteTheme['carousel'] = {
    control: {
      base: 'inline-flex h-8 w-8 items-center justify-center rounded-full bg-dark group-hover:bg-dark/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10',
    },
  }

  const handleCardClick = (location: LatLngExpression) => {
    map?.flyTo(location, 18)
  }

  // determine number of slides based on the user window size
  const slidesNum = (): number => {
    if (screenWidth > 1600) {
      return 5;
    } else if (screenWidth >= 1400) {
      return 4;
    } else if (screenWidth >= 800) {
      return 2;
    } else {
      return 3;
    }
  };
  

   // Listen for window resize to adjust slidesNum dynamically
   useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const placesPromise = placesFetch(category).then(fetchedPlaces =>
    fetchedPlaces.filter((place: IPlace) =>
      place.picture_url && VALIDATE_NO_SPACE_URL.test(place.picture_url)
    )
  );
  // filter for values with present picture
  const places = use(placesPromise);

  let slides: Array<ReactElement> = [];
  const numSlides = slidesNum(); // Call once and store the result
  for (let i = 0; i < places.length; i += numSlides) {
    const slice = places.slice(i, i + numSlides);
    const slide = slice.map((place: IPlace) => (
      <div key={i} className="flex justify-center">
        <div className="flex justify-evenly items-center w-full">
          {slice.map((place: IPlace) => (
            <div key={place.id} onClick={() => handleCardClick([place.latitude, place.longitude])} className="flex hover:scale-105 transition w-[20rem] h-52">
              <ImageWithFallback src={place.picture_url} alt={place.id} fallback={placeholderImage.src} className="w-full rounded-2xl" />
              <div className="flex absolute backdrop-brightness-50 rounded-2xl h-[inherit] w-[inherit] text-white">
                <h1 className="text-xl mx-4 mt-4">{place.name_fi}</h1>
                <h2 className="text-xs">{place.short_desc_fi}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    ));
    slides.push(slide);
  }

  return (
    <Suspense fallback={<div>Loading places...</div>}>
      <div className="flex z-[1000] h-[30%] w-full fixed bottom-5">
        <Carousel slide={false} indicators={true} draggable={true} theme={customTheme}>
          {slides}
        </Carousel>
      </div>
    </Suspense>
  );

}

export default CarouselComponent
