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



const fetchPlaces = async (category?: string): Promise<PlacesType> => {
  const data = await placesFetch(category)
  console.log(data)
  return data.map((place: any) => {
    let categoryValue: Category;
    if (category === 'Museo') {
      categoryValue = Category.CAT1;
    } else if (category === 'Muistomerkki') {
      categoryValue = Category.CAT2;
    } else if (category === 'Teatteri') {
      categoryValue = Category.CAT3;
    } else {
      categoryValue = Category.CAT2; // Default category value
    }

    return {
      position: [place.latitude, place.longitude],
      category: categoryValue,
      id: place.id
    };
  });
}


export default fetchPlaces