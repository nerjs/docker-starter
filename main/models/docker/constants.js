const RELOAD = 'docker:reload'

const DOCKER_EVENT = 'docker:event'
const EVENT_IMAGE = `${DOCKER_EVENT}:'image`
const EVENT_CONTAINER = `${DOCKER_EVENT}:'container`
const EVENT_NETWORK = `${DOCKER_EVENT}:'network`
const EVENT_VOLUME = `${DOCKER_EVENT}:volume`

const EVENTS = {
  image: EVENT_IMAGE,
  container: EVENT_CONTAINER,
  network: EVENT_NETWORK,
  volume: EVENT_VOLUME,
}

module.exports = {
  RELOAD,

  DOCKER_EVENT,

  EVENT_CONTAINER,
  EVENT_IMAGE,
  EVENT_NETWORK,
  EVENT_VOLUME,

  EVENTS,
}
