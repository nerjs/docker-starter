import React from 'react'
import { Code, Container, DockerLink, Info, InfoLink } from './blocks'

export default ({ full }) => (
  <Container>
    <Info>
      Docker не установлен. <br />
      Можно установить с сайта:{' '}
      <DockerLink href="https://docs.docker.com/engine/install/">https://docs.docker.com/engine/install/</DockerLink>
    </Info>
    <Info>Или по {full ? 'инструкции:' : <InfoLink to="/info/docker">инструкции...</InfoLink>}</Info>
    {full && (
      <Code>
        apt-get update <br />
        curl -fsSL https://get.docker.com -o get-docker.sh <br />
        sh get-docker.sh <br />
        usermod -aG docker $USER <br />
        docker --version <br />
      </Code>
    )}
  </Container>
)
