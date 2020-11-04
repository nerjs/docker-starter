import { useKey } from 'react-use'

export default (handleCallback, deps = []) => useKey(e => e.key === 'Escape', handleCallback, { event: 'keydown' }, deps)
