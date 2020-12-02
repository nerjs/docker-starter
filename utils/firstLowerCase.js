const firstLowerCase = str => `${str[0].toLowerCase()}${str.slice(1)}`

const firstKeysLowerCase = (obj, recursive = true, allStay = [], allLower = []) => {
  const nObj = {}
  Object.entries(obj).forEach(([key, value]) => {
    const nKey = allStay.includes(key) ? key : allLower.includes(key) ? `${key}`.toLowerCase() : firstLowerCase(key)
    nObj[nKey] = (() => {
      if (!recursive) return value

      const resObj = val => {
        if (Array.isArray(val)) return val.map(resObj)
        if (typeof val === 'object' && val !== null && !(val instanceof Date))
          return firstKeysLowerCase(val, recursive, allStay, allLower)
        return val
      }

      return resObj(value)
    })()
  })

  return nObj
}

exports.firstLowerCase = firstLowerCase
exports.firstKeysLowerCase = firstKeysLowerCase
