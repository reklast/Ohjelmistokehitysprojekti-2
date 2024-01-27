import React, { useState, useEffect } from 'react';

const PlacesApi = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const endpoint = 'https://api.hel.fi/linkedevents/v1/search/?type=place&input=ateneum';

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
  }, []); // Empty dependency array ensures useEffect runs only once, similar to componentDidMount

  return (
    <div>
      <h1>Places API Data</h1>
      {data && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
};

export default PlacesApi;