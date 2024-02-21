import React, { useEffect, useState } from 'react'
import { black } from 'tailwindcss/colors'

const EventsAPI = ({ display }) => {
  const [data, setData] = useState(null)

  const fetchData = async () => {
    const endpoint = 'https://api.hel.fi/linkedevents/v1/event/?musiikki_OR=konsertti&format=json'

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

  const styles = {
    container: {
      backgroundColor: 'green',
      border: '1px solid black',
      paddingTop: '25px',
      padding: '10px',
      height: '60vh',
      width: '75vw',
      overflowY: 'auto',
    },
  }
  const h1Styles = {
    container: {
      padding: '50px',
      fontSize: '26px',
      color: 'black',
    },
  }
  if (display) {
    return (
      <div style={styles.container}>
        <h1 style={{ color: black, padding: 30 }}>Tapahtumat</h1>
        <div style={{ maxHeight: '100%', overflowY: 'auto' }}>
          {data && Array.isArray(data) && data.length > 0 ? (
            data.map((item, index) => (
              <div key={index}>
                <h1 style={h1Styles.container} dangerouslySetInnerHTML={{ __html: item.name.fi }} />
                <div dangerouslySetInnerHTML={{ __html: item.description.fi }} />
              </div>
            ))
          ) : (
            <p>Ladataan</p>
          )}
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default EventsAPI
