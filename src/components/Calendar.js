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

import { SingleDayView } from './index'

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
            {DayRowCreator('month')}
            {DatesRowCreator(
              7,
              currentDate,
              month,
              year,
              monthlyEvents,
              startingDay
            )}
            {DatesRowCreator(
              7,
              currentDate + 7 - startingDay,
              month,
              year,
              monthlyEvents
            )}
            {DatesRowCreator(
              7,
              currentDate + 14 - startingDay,
              month,
              year,
              monthlyEvents
            )}
            {DatesRowCreator(
              7,
              currentDate + 21 - startingDay,
              month,
              year,
              monthlyEvents
            )}
            {DatesRowCreator(
              7,
              currentDate + 28 - startingDay,
              month,
              year,
              monthlyEvents
            )}
          </Grid>
        )}
        {currentView === 'day' && <SingleDayView />}
        {currentView === 'events' && (
          <Grid divided="vertically">
            <Grid.Row centered columns={4}>
              {EventColumnCreator('header', 'Date')}
              {EventColumnCreator('header', 'Time')}
              {EventColumnCreator('header', 'Event Name')}
              {EventColumnCreator('header', 'Description')}
            </Grid.Row>

            {/* prints when there are no events for the current month */}
            {!this.props.events.length && (
              <h3 className="no-events">You Have No Events For This Month!</h3>
            )}
            {this.props.events.sort((a, b) => a.day > b.day).map(event => {
              {
                /* Sorts the events by day and then creates a row for every event, including its name, date,
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
