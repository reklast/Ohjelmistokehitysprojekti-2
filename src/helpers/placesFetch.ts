const placesFetch = async (query?: string) => {
  const data = await fetch(`https://www.hel.fi/palvelukarttaws/rest/v4/unit/?search=${query ? query : 'muistomerkki'}`)
  
  return await data.json()
}

export default placesFetch