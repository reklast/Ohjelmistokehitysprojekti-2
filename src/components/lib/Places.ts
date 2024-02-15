import { LatLngExpression } from 'leaflet'

import placesFetch from '@src/helpers/placesFetch'

import { Category } from './MarkerCategories'

Category.CAT1

export interface PlaceValues {
  position: LatLngExpression
  category: Category
}
export type PlacesType = PlaceValues[]
export type PlacesClusterType = Record<string, PlaceValues[]>


const fetchPlaces = async (): Promise<PlacesType> => {
    const data = await placesFetch()

    return await data.map((place: any) => ({
      position: [place.latitude, place.longitude],
      category: Category.CAT2,
      id: place.id
    }))
}



export default fetchPlaces