import axios from 'axios'

const FETCH_EVENTS = 'FETCH_EVENTS'
const POST_EVENT = 'POST_EVENT'
const DELETE_EVENT = 'DELETE_EVENT'
const PUT_EVENT = 'PUT_EVENT'

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

export const deleteEvent = id => {
  return {
    type: DELETE_EVENT,
    id
  }
}

export const updateEvent = event => {
  return {
    type: PUT_EVENT,
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

export const deleteEventFromDb = id => dispatch => {
  return axios
    .delete(`/api/events/${id}`)
    .then(res => res.data)
    .then(() => {
      dispatch(deleteEvent(id))
    })
    .catch(err => console.log(err))
}

export const updateEventInDb = (id, eventObj) => dispatch => {
  return axios
    .put(`/api/events/${id}`, eventObj)
    .then(res => res.data)
    .then(event => {
      dispatch(updateEvent(event))
    })
    .catch(err => console.log(err))
}

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_EVENTS:
      return action.events
    case POST_EVENT:
      return [...state, action.event]
    //put event filters out old existing event and concats the new one after updating
    case PUT_EVENT:
      return state
        .filter(event => event.id !== action.event.id)
        .concat(action.event)
    case DELETE_EVENT:
      return state.filter(event => event.id !== action.id)
    default:
      return state
  }
}
