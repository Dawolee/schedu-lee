import { connect } from 'react-redux'
import Events from './Events'
import { postEventToDb, updateEventInDb } from '../store/events'

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
    updateEvent: (id, eventObj) => {
      dispatch(updateEventInDb(id, eventObj))
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(Events)
