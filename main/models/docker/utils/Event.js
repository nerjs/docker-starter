class Event {
  constructor(obj) {
    Object.entries(obj).forEach(([key, value]) => {
      this[key] = value
    })
  }

  get correct() {
    return !!this.type
  }
}

module.exports = Event
