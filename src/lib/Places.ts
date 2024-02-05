import { LatLngExpression } from 'leaflet'

import { Category } from './MarkerCategories'
import {getPlacesAPIData} from "@pages/api/placesAPI"

export interface PlaceValues {
  position: LatLngExpression
  category: Category
}
export type PlacesType = PlaceValues[]
export type PlacesClusterType = Record<string, PlaceValues[]>
const placesAPIData = getPlacesAPIData();




export const Places: PlacesType = [
  {
    position: [60.1699, 24.9384],
    category: Category.CAT1,
  },
  {
    position: [60.1699, 24.9384],
    category: Category.CAT2,
  },
]
