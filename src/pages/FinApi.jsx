import React, { useEffect, useState } from 'react';

const API_BASE_URL = '/api/authenticate';

const FinApi = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const fetchDataFromServerlessFunction = async () => {
      try {
        setLoading(true);
  
        const response = await fetch('/api/authenticate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: 'pauli.selenius@gmail.com',
            password: 'Moikkab2!',
          }),
        });
  
        const responseData = await response.json();
  
        if (response.ok) {
          setData(responseData);
        } else {
          setError('Request to serverless function failed');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
        setError('Internal Server Error');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div>
        <button onClick={fetchDataFromServerlessFunction}>Fetch Data</button>
  
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {data && (
          <div>
            <h2>Data from Serverless Function:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  };
  
export default FinApi;
