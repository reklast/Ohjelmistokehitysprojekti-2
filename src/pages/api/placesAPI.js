let placesAPIData = null

export const setPlacesAPIData = data => {
  placesAPIData = data
  console.log(placesAPIData)
}

export const getPlacesAPIData = () => {
  console.log(placesAPIData)
  return placesAPIData
}
