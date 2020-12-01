import React from 'react'
import { InfoHomeBlock } from './blocks'
import Loading from '../../../components/Loading'
import Alert from '../../../components/Alert'
import { AlertError } from '../../../components/Alert'

export default () => {
  const err = new TypeError(
    'Non dolore ex cupidatat Lorem consequat tempor enim. Sit aliqua ullamco eu ea non sunt ullamco. Mollit exercitation veniam ad aliquip voluptate do nulla ut adipisicing. Magna Lorem eiusmod fugiat esse ut aliquip sit cupidatat voluptate velit duis occaecat.',
  )
  err.test = 123
  err.qwerty = 'Tratata'
  return (
    <InfoHomeBlock>
      <Alert>Test default alert</Alert>
      <Alert info>Test info alert</Alert>
      <Alert warn>Test warn alert </Alert>

      <Alert rows>
        Esse aute veniam labore et fugiat irure magna ea ea. Deserunt aliquip laboris duis ex mollit labore. Excepteur nisi
        pariatur quis aute ipsum nostrud sunt laborum occaecat amet reprehenderit Lorem velit. Do pariatur commodo id ipsum
        occaecat consequat reprehenderit quis. Cillum ipsum excepteur eiusmod qui est.
        <br />
        Esse aute veniam labore et fugiat irure magna ea ea. Deserunt aliquip laboris duis ex mollit labore. Excepteur nisi
        pariatur quis aute ipsum nostrud sunt laborum occaecat amet reprehenderit Lorem velit. Do pariatur commodo id ipsum
        occaecat consequat reprehenderit quis. Cillum ipsum excepteur eiusmod qui est.
        <br />
        Esse aute veniam labore et fugiat irure magna ea ea. Deserunt aliquip laboris duis ex mollit labore. Excepteur nisi
        pariatur quis aute ipsum nostrud sunt laborum occaecat amet reprehenderit Lorem velit. Do pariatur commodo id ipsum
        occaecat consequat reprehenderit quis. Cillum ipsum excepteur eiusmod qui est.
        <br />
        Esse aute veniam labore et fugiat irure magna ea ea. Deserunt aliquip laboris duis ex mollit labore. Excepteur nisi
        pariatur quis aute ipsum nostrud sunt laborum occaecat amet reprehenderit Lorem velit. Do pariatur commodo id ipsum
        occaecat consequat reprehenderit quis. Cillum ipsum excepteur eiusmod qui est.
        <br />
      </Alert>

      <AlertError error={err} rows={100} />
    </InfoHomeBlock>
  )
}
