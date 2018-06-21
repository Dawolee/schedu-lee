import React, { Component } from 'react'
import { Grid, Container, Button, Popup, Form } from 'semantic-ui-react'
import Events from './Events'

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
    let dates = 1
    const ColumnHelper = (className, textAlign, key, content) => {
      return (
        <Grid.Column
          className={className}
          width={2}
          key={key}
          textAlign={textAlign}
        >
          {content}
        </Grid.Column>
      )
    }
    const RowCreator = (num, bool) => {
      let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      //if true (which only happens once anyways), makes a row of days
      if (bool) {
        return (
          <Grid.Row className="grid-day-row" centered>
            {days.map(day => {
              return ColumnHelper('grid-day', 'center', day, day)
            })}
          </Grid.Row>
        )
      } else {
        //otherwise, create columns and use the 'dates' variable declared above to keep track of how many days to put into the calendar
        let { month, year } = this.props.currentDate
        let columns = []
        while (num > 0 && dates <= 35) {
          dates <= 31
            ? columns.push(
                <Popup
                  hideOnScroll
                  position="left center"
                  key={dates}
                  trigger={ColumnHelper('grid-date', 'left', dates, dates)}
                  on="click"
                >
                  <Popup.Header>
                    Add Event to {month}/{dates}/{year}
                  </Popup.Header>{' '}
                  <Popup.Content>
                    <Events />
                  </Popup.Content>
                </Popup>
              )
            : columns.push(ColumnHelper('grid-date', 'left', dates))
          dates++
          num--
        }
        return (
          <Grid.Row className="grid-dates-row" centered>
            {columns}
          </Grid.Row>
        )
      }
    }
    //togglebar updates the view and updates the view state, allowing calendar to alter its design
    let { currentView } = this.props

    return (
      <Container className="calendar">
        {currentView === 'month' && (
          <Grid>
            {RowCreator(7, true)}
            {RowCreator(7, false)}
            {RowCreator(7, false)}
            {RowCreator(7, false)}
            {RowCreator(7, false)}
            {RowCreator(7, false)}
          </Grid>
        )}
        {currentView === 'week' && (
          <Grid>
            {RowCreator(7, true)}
            {RowCreator(7, false)}
          </Grid>
        )}
        {currentView === 'day' && <Grid>{RowCreator(7, true)}</Grid>}
      </Container>
    )
  }
}
