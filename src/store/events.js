import axios from 'axios'

const FETCH_EVENTS = 'FETCH_EVENTS'
const POST_EVENT = 'POST_EVENT'

export const getEvents = events => {
  return {
    type: FETCH_EVENTS,
    events
  }
}

export const postEvent = event => {
  return {
    type: POST_EVENT,
    event
  }
}

//grabs date from calendar and sends to back end to filter out events by date.
export const fetchEventsFromDb = (month, year) => dispatch => {
  return axios
    .get(`/api/events/${month}/${year}`, { month: month, year: year })
    .then(res => res.data)
    .then(events => {
      dispatch(getEvents(events))
    })
    .catch(err => console.log(err))
}

export const postEventToDb = eventObj => dispatch => {
  return axios
    .post(`/api/events/`, eventObj)
    .then(res => res.data)
    .then(event => {
      dispatch(postEvent(event))
    })
    .catch(err => console.log(err))
}

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_EVENTS:
      return action.events
    case POST_EVENT:
      return [...state, action.event]
    default:
      return state
  }
}
