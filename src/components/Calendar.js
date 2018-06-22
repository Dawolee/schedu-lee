import React, { Component } from 'react'
import { Grid, Container, Button, Popup, Form } from 'semantic-ui-react'
import {
  ColumnCreator,
  DayRowCreator,
  DatesRowCreator
} from './HelperFunctions'

export default class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'month',
      month: 1,
      year: 2018
    }
  }

  //when calendar mounts, fetches from the database all events associated with the current month/year
  componentDidMount() {
    let { month, year } = this.state
    this.props.loadEvents(month, year)
  }

  //when date is changed, compares to date in current local state and if different, updates state and refetches events from database associated with the current month/year
  componentWillReceiveProps(nextProps) {
    let { month, year } = nextProps.currentDate
    if (month !== this.state.month || year !== this.state.year) {
      this.setState({ month: month, year: year }, () =>
        this.props.loadEvents(this.state.month, this.state.year)
      )
    }
  }

  render() {
    //converts the events array received from backend into a hashmap for easier lookup
    let monthlyEvents = this.props.events.length
      ? this.props.events.reduce(function(map, obj) {
          map[obj.day] = map[obj.day] ? map[obj.day].concat(obj) : [obj]
          return map
        }, {})
      : null
    let dates = 1
    //togglebar updates the view and updates the view state, allowing calendar to alter its design
    let { currentView } = this.props
    let { month, year } = this.state
    return (
      <Container className="calendar">
        {currentView === 'month' && (
          <Grid>
            {DayRowCreator()}
            {DatesRowCreator(7, dates, month, year, monthlyEvents)}
            {DatesRowCreator(7, dates + 7, month, year, monthlyEvents)}
            {DatesRowCreator(7, dates + 14, month, year, monthlyEvents)}
            {DatesRowCreator(7, dates + 21, month, year, monthlyEvents)}
            {DatesRowCreator(7, dates + 28, month, year, monthlyEvents)}
          </Grid>
        )}
        {currentView === 'week' && (
          <Grid>
            {DayRowCreator()}
            {DatesRowCreator(7, dates, month, year)}
          </Grid>
        )}
        {currentView === 'day' && <Grid>{DayRowCreator()}</Grid>}
        {currentView === 'day' && <Grid />}
      </Container>
    )
  }
}
