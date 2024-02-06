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
  try {
    const data = await placesFetch()
    console.log(data)

    return data.map((place: any) => ({
      position: [place.latitude, place.longitude],
      category: Category.CAT1,
    }))
  } catch (error) {
    console.error('Error fetching places:', error)
    return []
  }
}

export const loadPlaces = async (): Promise<void> => {
  try {
    const places = await fetchPlaces()
    // Assign the fetched places to the Places constant
    Object.assign(Places, places)
  } catch (error) {
    console.error('Error loading places:', error)
  }
}

export const Places: PlacesType = []

loadPlaces()
