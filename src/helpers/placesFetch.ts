const placesFetch = async () => {
    const data = await fetch('https://www.hel.fi/palvelukarttaws/rest/v4/unit/?search=history');
  
    return await data.json();
}

export default placesFetch;