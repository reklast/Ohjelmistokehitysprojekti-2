
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
          'http://api.weatherapi.com/v1/current.json?key=4f773e0aefc04debb4a104721241402&q=Helsinki&aqi=no',
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
    <div>
    
      <p>Temperature: {weatherData.current.temp_c} °C</p>
      
      <WeatherIcon iconUrl={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
    </div>
  )
}

export default WeatherComponent
const WeatherIcon = ({ iconUrl, alt }) => {
  return <img src={iconUrl} alt={alt} />;
};