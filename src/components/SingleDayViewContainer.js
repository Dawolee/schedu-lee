import { connect } from 'react-redux'
import SingleDayView from './SingleDayView'
import { updateView } from '../store/view'
import { deleteEventFromDb } from '../store/events'

const mapState = state => {
  return {
    currentView: state.view,
    currentDate: state.date,
    events: state.events
  }
}

const mapDispatch = dispatch => {
  return {
    viewChange: view => {
      dispatch(updateView(view))
    },
    deleteEvent: id => {
      dispatch(deleteEventFromDb(id))
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(SingleDayView)
