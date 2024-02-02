import React, { useState, useEffect } from 'react';

const PlacesApi = ({data, setData}) => {
  

  const fetchData = async () => {
    const endpoint = 'https://www.hel.fi/palvelukarttaws/rest/v4/unit/?search=history';

    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  return (
    <div>
      <h1>Places API Data</h1>
      {data && data.map(item => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <p>{item.desc_fi}</p>
          <p>Latitude: {item.latitude}</p>
          <p>Longitude: {item.longitude}</p>
        </div>
      ))}
    </div>
  );
};

export default PlacesApi;

