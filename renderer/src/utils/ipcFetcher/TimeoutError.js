export default class TimeoutError extends Error {
  constructor() {
    const message = 'Timeout error'
    super(message)
    this.message = message
  }

  get name() {
    return 'TimeoutError'
  }
}
