import React, { useEffect, useState } from 'react';

const EventsAPI = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const endpoint = 'https://api.hel.fi/linkedevents/v1/event/?local_ongoing_OR=musiikki&format=json';

    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      setData(responseData.data); // Assuming the actual data is nested under the 'data' property
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
 const styles = {
    backgroundColor: 'red',
    border: '1px solid black',
    padding: '10px',
    height: '50%',
    width: '50%',
 }
  return (
    <div style={styles}>
      <h1>Events API Data</h1>
      {data && Array.isArray(data) && data.length > 0 ? (
        data.map((item, index) => (
          <div key={index}>
            <h2>{item.name.fi}</h2>
            <div dangerouslySetInnerHTML={{ __html: item.description.fi }} />
          </div>
        ))
      ) : (
        <p>No events found</p>
      )}
    </div>
  );
};

export default EventsAPI;
