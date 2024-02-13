const placesFetch = async (search: string) => {
  const url = `https://www.hel.fi/palvelukarttaws/rest/v4/unit/?search=${search}`;
  const data = await fetch(url);
  return await data.json();
}

export default placesFetch;