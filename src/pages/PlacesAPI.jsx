import React, { useState, useEffect } from 'react';
import { setPlacesAPIData } from "@pages/api/placesAPI";

const PlacesApi = ({ data, setData }) => {
  const fetchData = async () => {
  const endpoint = 'https://www.hel.fi/palvelukarttaws/rest/v4/unit/?search=history';

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    // Assuming responseData is an array, you can map it here
    const mappedData = responseData.map(item => ({
      id: item.id,
      name: item.name_fi,
      description: item.short_desc_fi,
      latitude: item.latitude,
      longitude: item.longitude,
    }));

    setData(mappedData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


  useEffect(() => {
    fetchData();
  }, [data]); 

  useEffect(() => {
    // Add data to the dependency array to prevent infinite loop
    setPlacesAPIData(data);
  }, [data]);

  return (
    <div>
      <h1>Places API Data</h1>
      {data && data.map(item => (
        <div key={item.id}>
          <h1>{item.name_fi}</h1>
          <p>{item.short_desc_fi}</p>
          <p>Latitude: {item.latitude}</p>
          <p>Longitude: {item.longitude}</p>
        </div>
      ))}
    </div>
  );
};

export default PlacesApi;
