class Counter {
  get num() {
    Counter.count = (Counter.count > 0 && Counter.count <= Number.MAX_SAFE_INTEGER ? Counter.count : 0) + 1
    return Counter.count
  }

  get current() {
    return Counter.count > 0 ? Counter.count : 0
  }
}

module.exports = Counter
