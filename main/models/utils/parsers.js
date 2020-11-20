const allStay = []
const allLower = ['ID']

const firstLowerCase = obj => {
  Object.entries(obj).forEach(([key, value]) => {
    if (allStay.includes(key)) return
    delete obj[key]
    const nKey = allLower.includes(key) ? key.toLowerCase() : `${key[0].toLowerCase()}${key.slice(1)}`
    obj[nKey] = typeof value === 'object' && !Array.isArray(value) && value !== null ? firstLowerCase(value) : value
  })

  return obj
}

exports.parseItem = str => firstLowerCase(JSON.parse(str))

exports.parseList = str =>
  str
    .trim()
    .match(/\{(.*)\}/gi)
    .map(exports.parseItem)

exports.parseTime = str => {
  if (!str || !str.length) throw new Error('Incorrect date string')
  // return moment(str.replace(/\s([A-Z]+)$/, '($1)'))
  return new Date(str.replace(/\s([A-Z]+)$/, '($1)'))
}
