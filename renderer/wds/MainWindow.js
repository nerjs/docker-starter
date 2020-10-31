const Base = require('./Base')

module.exports = () =>
  Base('main', {
    width: 800,
    height: 500,
    title: 'Main',
    titleBarStyle: 'hidden',
  })
