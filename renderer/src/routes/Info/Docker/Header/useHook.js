import { gql, useQuery, useSubscription } from '@apollo/react-hooks'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const GET_INFO = gql`
  {
    docker {
      info {
        version
        containers {
          running
          count
        }
        images {
          uses
          count
        }
      }
    }
  }
`

const useEvents = () => {
  const [events, setEvents] = useState(0)

  useEffect(() => {
    const tid = setInterval(() => setEvents(e => e + 1), 1000)
    return () => clearInterval(tid)
  }, [setEvents])

  return `${events}`
}

export default () => {
  const { loading, error, data } = useQuery(GET_INFO)
  const innerEvents = useEvents()
  const [events, setEvents] = useState(0)
  const { pathname } = useLocation()

  useEffect(() => {
    if (error) alert(JSON.stringify(error))
  }, [error])

  useEffect(() => {
    if (pathname === '/info/docker/events') return setEvents(0)
    setEvents(e => e + 1)
  }, [pathname, innerEvents, setEvents])

  return {
    loading,
    version: data?.docker?.info?.version,
    containers: data?.docker?.info?.containers || {},
    images: data?.docker?.info?.images || {},
    events,
  }
}
