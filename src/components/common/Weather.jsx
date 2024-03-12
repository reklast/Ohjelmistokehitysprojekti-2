'use client'

import React, { useEffect, useState } from 'react'

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
    <div className="flex justify-between pr-6 sm:justify-normal items-center">
      <WeatherIcon iconUrl={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />

      <p className='text-center'>
        <p className="hidden sm:block p-2">Lämpötila:  {weatherData.current.temp_c} °C
      </p>
      </p>
    </div>
  )
}

export default WeatherComponent
const WeatherIcon = ({ iconUrl, alt }) => {
  return <img className="w-12" src={iconUrl} alt={alt} />
}
