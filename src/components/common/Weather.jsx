'use client'

import React, { useEffect, useState } from 'react'

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const weatherStyles = {
    container: {
      position: 'fixed',
      top: 0,
      left: 800,
    },
  }
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Fetch weather data from an API
        const response = await fetch(
          'https://api.weatherapi.com/v1/current.json?key=4f773e0aefc04debb4a104721241402&q=Helsinki&aqi=no',
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
          },
        )
        if (!response.ok) {
          throw new Error('Failed to fetch weather data')
        }
        const data = await response.json()
        setWeatherData(data)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!weatherData) {
    return null
  }

  return (
    <div style={weatherStyles.container} className='flex items-center'>
      <WeatherIcon iconUrl={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
      <p>Temperature: {weatherData.current.temp_c} °C</p>
    </div>
  )
}

export default WeatherComponent
const WeatherIcon = ({ iconUrl, alt }) => {
  return <img src={iconUrl} alt={alt} className="mr-4" />
}
