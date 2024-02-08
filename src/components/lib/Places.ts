import { LatLngExpression } from 'leaflet'
import placesFetch from '@src/helpers/placesFetch'
import { Category } from './MarkerCategories'

export interface PlaceValues {
  position: LatLngExpression
  category: Category
}
export type PlacesType = PlaceValues[]
export type PlacesClusterType = Record<string, PlaceValues[]>

const fetchPlaces = async (label: string): Promise<PlacesType> => {
  console.log(label)
  try {
    const data = await placesFetch(label); 
    console.log(data);
    

    return data.map((place: any) => ({
      position: [place.latitude, place.longitude],
      category: Category.CAT2, 
    }));
  } catch (error) {
    console.error('Error fetching places:', error);
    return [];
  }
}

export const loadPlaces = async (): Promise<void> => {
  try {
    const places = await fetchPlaces('');
    // Assign the fetched places to the Places constant
    Object.assign(Places, places);
  } catch (error) {
    console.error('Error loading places:', error);
  }
}

export const Places: PlacesType = [];

loadPlaces();
