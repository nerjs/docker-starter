const ReactDOM = require('react-dom')
const React = require('react')

export default Comp => {
  if (!window || !window.document) throw new Error('window object not found')
  const rootElement =
    window.document.getElementById('__root__') ||
    (() => {
      const el = window.document.createElement('div')
      el.id = '__root__'
      window.document.body.prepend(el)
      return el
    })()

  ReactDOM.render(<Comp />, rootElement)
}
