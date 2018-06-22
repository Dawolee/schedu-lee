import React, { Component } from 'react'
import {
  Grid,
  Container,
  Button,
  Popup,
  Form,
  GridColumn,
  Icon
} from 'semantic-ui-react'
//importing helper functions to create reusable components
import {
  ColumnCreator,
  DayRowCreator,
  DatesRowCreator,
  EventColumnCreator
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

    //togglebar updates the view and updates the view state, allowing calendar to alter its design
    let { currentView } = this.props
    let { month, year } = this.state

    //formula to figure out which day/date the month starts on
    let startingDay = new Date(year + '-' + month + '-01').getDay()
    let currentDate = 1
    return (
      <Container className="calendar">
        {/* Depending on the currentView, alters how what the calendar displays */}
        {currentView === 'month' && (
          <Grid>
            {DayRowCreator()}
            {DatesRowCreator(
              7,
              currentDate,
              month,
              year,
              monthlyEvents,
              startingDay
            )}
            {DatesRowCreator(7, currentDate + 7, month, year, monthlyEvents)}
            {DatesRowCreator(7, currentDate + 14, month, year, monthlyEvents)}
            {DatesRowCreator(7, currentDate + 21, month, year, monthlyEvents)}
            {/* If February, only render out 4 rows of dates */}
            {month !== 2 &&
              DatesRowCreator(7, currentDate + 28, month, year, monthlyEvents)}
          </Grid>
        )}
        {currentView === 'week' && <Grid>{DayRowCreator()}</Grid>}
        {currentView === 'day' && <Grid>{DayRowCreator()}</Grid>}
        {currentView === 'events' && (
          <Grid divided="vertically">
            <Grid.Row centered columns={4}>
              {EventColumnCreator('header', 'Date')}
              {EventColumnCreator('header', 'Time')}
              {EventColumnCreator('header', 'Event Name')}
              {EventColumnCreator('header', 'Description')}
            </Grid.Row>
            {this.props.events.map(event => {
              {
                /* Creates a row for every event, including its name, date,
              start/end time and description*/
              }
              return (
                <Grid.Row key={event.id} centered columns={4}>
                  {EventColumnCreator(null, `${event.month}/${event.day}`)}
                  {EventColumnCreator(
                    null,
                    `${event.startTime} - ${event.endTime}`
                  )}
                  {EventColumnCreator(null, `${event.name}`)}
                  {EventColumnCreator(null, `${event.description}`)}
                </Grid.Row>
              )
            })}
          </Grid>
        )}
      </Container>
    )
  }
}
