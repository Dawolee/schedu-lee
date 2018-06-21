import axios from 'axios'

const FETCH_EVENTS = 'FETCH_EVENTS'

export const getEvents = events => {
  return {
    type: FETCH_EVENTS,
    events
  }
}

//grabs date from calendar and sends to back end to filter out events by date.
export const fetchEventsFromDb = (month, year) => dispatch => {
  return axios
    .get(`/api/events/${month}/${year}`, { month, year })
    .then(res => res.data)
    .then(events => {
      dispatch(getEvents(events))
    })
    .catch(err => console.log(err))
}

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_EVENTS:
      return action.events
    default:
      return state
  }
}
