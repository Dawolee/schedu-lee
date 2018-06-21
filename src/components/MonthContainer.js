import { connect } from 'react-redux'
import Month from './Month'
import { updateDate } from '../store/date'

const mapState = state => {
  return {
    currentDate: state.date
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
)(Month)
