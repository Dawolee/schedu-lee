const UPDATE_DATE = 'UPDATE_DATE'

export const updateDate = date => {
  return {
    type: UPDATE_DATE,
    date
  }
}

export default function(state = { month: 1, year: 2018 }, action) {
  switch (action.type) {
    case UPDATE_DATE:
      return action.date
    default:
      return state
  }
}
