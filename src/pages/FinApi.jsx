import React, { useEffect, useState } from 'react'

const API_BASE_URL = '/api/authenticate' // Relative path to your API route

const FinApi = () => {
  const [token, setToken] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const authenticateAndGetToken = async () => {
    const requestBody = {
      username: 'pauli.selenius@gmail.com',
      password: 'Moikkab2!',
    }

    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      const responseData = await response.json()
      if (response.ok) {
        setToken(responseData.access_token)
      } else {
        setError('Authentication failed')
      }
    } catch (error) {
      console.error('Error during authentication:', error)
      setError('Internal Server Error')
    } finally {
      setLoading(false)
    }
  }

  const fetchData = async () => {
    const graphqlQuery = `query ExperienceDescriptions {
      product(where: {type: {_eq: experience}}) {
        id
        productInformations {
            description
            language
            name
        }
      }
    }`

    const requestBody = {
      query: graphqlQuery,
      // Add variables or operationName if needed
    }

    try {
      const response = await fetch('https://api-datahub.visitfinland.com/graphql/v1/graphql', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      const responseData = await response.json()
      if (response.ok) {
        setData(responseData)
      } else {
        setError('GraphQL request failed')
      }
    } catch (error) {
      console.error('Error during GraphQL request:', error)
      setError('Internal Server Error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    authenticateAndGetToken()
  }, [])

  useEffect(() => {
    if (token) {
      fetchData()
    }
  }, [token])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return (
      <>
        <div>
          <p></p>
          Error: {error}
        </div>
      </>
    )
  }

  return <div>{data && <pre>{JSON.stringify(data, null, 2)}</pre>}</div>
}

export default FinApi
