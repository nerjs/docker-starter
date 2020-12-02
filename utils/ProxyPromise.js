class ProxyPromise {
  constructor() {
    this.promises = new Map()
  }

  load(name, fn) {
    if (this.promises.has(name)) return this.promises.get(name)

    const promise = fn()

    if (promise instanceof Promise) {
      this.promises.set(name, promise)
      promise.finally(() => {
        this.promises.delete(name)
      })
    }

    return promise
  }

  wrap(name, fn) {
    const proxy = this
    const newFn = function wrapped(...args) {
      return proxy.load(Symbol.for(`${name}:${JSON.stringify(args)}`), () => fn.apply(this, args))
    }

    Object.defineProperty(newFn, 'name', { writable: true })
    newFn.name = `${name}[Wrapped]`
    Object.defineProperty(newFn, 'name', { writable: false })

    return newFn
  }

  static create() {
    const proxy = new ProxyPromise()

    return (name, fn) => proxy.load(name, fn)
  }

  static wrap(obj, names) {
    const proxy = new ProxyPromise()
    names.forEach(name => {
      if (typeof obj[name] !== 'function') return
      obj[name] = proxy.wrap(name, obj[name]).bind(obj)
    })
  }
}

module.exports = ProxyPromise
