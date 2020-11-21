import { gql, useQuery, useSubscription } from '@apollo/react-hooks'
import React, { useEffect, useState } from 'react'

const TEST_GQL = gql`
  query($iid: Int!) {
    test(id: $iid) {
      id
      name
    }
  }
`

const Test = () => {
  const { loading, data, error, ...f } = useQuery(TEST_GQL, {
    variables: {
      iid: 321,
    },
  })
  console.log({ f })
  return <pre>{JSON.stringify({ loading, error, data }, null, 4)}</pre>
}

export default () => {
  const [a, setA] = useState(true)

  // useEffect(() => {
  //   const tid = setTimeout(() => setA(false), 5000)
  //   return () => clearTimeout(tid)
  // }, [])

  return a ? <Test /> : null
}
