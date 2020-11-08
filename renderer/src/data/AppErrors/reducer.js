export const ADD_ERROR = 'ADD_ERROR'
export const REMOVE_ERROR = 'REMOVE_ERROR'
export const CLEAR_ERRORS = 'CLEAR_ERRORS'

const filterFn = (prev, current) =>
  prev.project === current.project && prev.service === current.service && (!prev.id || !current.id || prev.id === current.id)

export default (state = [], { type, payload }) => {
  switch (type) {
    case ADD_ERROR:
      if (!state.find(err => filterFn(err, payload))) {
        return [...state, payload]
      }
      break
    case REMOVE_ERROR:
      return state.filter(err => !filterFn(err, payload))
      break
    case CLEAR_ERRORS:
      return []
      break
    default:
      return state
  }
}
