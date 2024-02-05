import React, { useEffect, useState } from 'react'

const EventsAPI = () => {
  const [data, setData] = useState(null)

  const fetchData = async () => {
    const endpoint = 'https://api.hel.fi/linkedevents/v1/event/?local_ongoing_OR=lapsi,musiikki&format=json'

    try {
      const response = await fetch(endpoint)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const responseData = await response.json()
      setData(responseData.data) // Assuming the actual data is nested under the 'data' property
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <h1>Evets API Data</h1>
      {Array.isArray(data) &&
        data.map(item => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description.fi}</p>
          </div>
        ))}
    </div>
  )
}

export default EventsAPI
