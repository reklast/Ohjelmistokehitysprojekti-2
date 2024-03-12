import { LatLngExpression } from 'leaflet'

import { IPlace } from '@src/@types/places'
import placesFetch from '@src/helpers/placesFetch'

import { Category } from './MarkerCategories'

Category.CAT1

export interface PlaceValues extends IPlace {
  position: LatLngExpression
  category: Category
}
export type PlacesType = PlaceValues[]
export type PlacesClusterType = Record<string, PlaceValues[]>

const fetchPlaces = async (category?: string): Promise<PlacesType> => {
  const data = await placesFetch(category)
  console.log(data)
  return data.map((place: any) => ({
    ...place,
    position: [place.latitude, place.longitude],
    category: Category.CAT2,
    id: place.id,
  }))
}

export default fetchPlaces
