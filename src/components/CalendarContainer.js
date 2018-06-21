import { connect } from 'react-redux'
import Calendar from './Calendar'
import { fetchEventsFromDb } from '../store/events'

const mapState = state => {
  return {
    currentView: state.view,
    currentDate: state.date,
    events: state.events
  }
}

const mapDispatch = dispatch => {
  return {
    loadEvents: (month, year) => {
      dispatch(fetchEventsFromDb(month, year))
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(Calendar)
