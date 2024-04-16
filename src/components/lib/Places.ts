import { LatLngExpression } from 'leaflet'

import { IPlace } from '@src/@types/places'
import placesFetch from '@src/helpers/placesFetch'

import { Category } from './MarkerCategories'


export interface PlaceValues extends IPlace {
  position: LatLngExpression
  category: Category
}
export type PlacesType = PlaceValues[]
export type PlacesClusterType = Record<string, PlaceValues[]>

const categoryMapping: Record<string, Category> = {
  Museo: Category.CAT3,
  Teatteri: Category.CAT4,
  Muistomerkki: Category.CAT2  // Assuming 'Muistomerkki' corresponds to CAT3
};


const fetchPlaces = async (category?: string): Promise<PlacesType> => {
  const data = await placesFetch(category)
  console.log(category)
  
  return data.map((place: any) => ({
    ...place,
    position: [place.latitude, place.longitude],
    category: category ? categoryMapping[category] : Category.CAT3,
    id: place.id,
  }))
}




export default fetchPlaces
