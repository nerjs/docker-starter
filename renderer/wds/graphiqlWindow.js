const Base = require('./Base')

module.exports = () =>
  Base('graphiql', {
    width: 800,
    height: 500,
    title: 'Graphiql',
    titleBarStyle: 'hidden',
    backgroundColor: '#fff',
  })
