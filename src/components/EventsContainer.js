import { connect } from 'react-redux'
import Events from './Events'
import { postEventToDb } from '../store/events'

const mapState = state => {
  return {
    events: state.events
  }
}

const mapDispatch = dispatch => {
  return {
    createEvent: eventObj => {
      dispatch(postEventToDb(eventObj, history))
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(Events)
