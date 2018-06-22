import { connect } from 'react-redux'
import Events from './Events'
import {
  postEventToDb,
  deleteEventFromDb,
  updateEventInDb
} from '../store/events'

const mapState = state => {
  return {
    events: state.events
  }
}

const mapDispatch = dispatch => {
  return {
    createEvent: eventObj => {
      dispatch(postEventToDb(eventObj))
    },
    deleteEvent: id => {
      dispatch(deleteEventFromDb(id))
    },
    updateEvent: (id, eventObj) => {
      dispatch(updateEventInDb(id, eventObj))
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(Events)
