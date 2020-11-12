const Base = require('./Base')

module.exports = () =>
  Base('playground', {
    width: 800,
    height: 500,
    title: 'Graphql playground',
    titleBarStyle: 'hidden',
    backgroundColor: '#fff',
  })
