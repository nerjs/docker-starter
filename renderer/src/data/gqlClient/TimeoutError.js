export default class TimeoutError extends Error {
  constructor() {
    super('Timeout error')
    this.name = 'TimeoutError'
  }
}
