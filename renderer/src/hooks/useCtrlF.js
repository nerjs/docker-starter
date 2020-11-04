import { useKey } from 'react-use'

export default (handleCallback, deps = []) =>
  useKey(e => e.keyCode === 70 && e.ctrlKey, handleCallback, { event: 'keyup' }, deps)
