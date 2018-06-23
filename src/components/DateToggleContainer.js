import { connect } from 'react-redux'
import DateToggle from './DateToggle'
import { updateDate } from '../store/date'

const mapState = state => {
  return {
    currentDate: state.date,
    currentView: state.view
  }
}

const mapDispatch = dispatch => {
  return {
    changeDate: date => {
      dispatch(updateDate(date))
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(DateToggle)
