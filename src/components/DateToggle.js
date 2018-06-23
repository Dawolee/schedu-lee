import React, { Component } from 'react'
import { Menu, Button, Container } from 'semantic-ui-react'

export default class DateToggle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      month: 1,
      year: 2018,
      day: 1
    }
    this.changeView = this.changeView.bind(this)
  }

  changeView(bool) {
    let currentMonth = this.state.month
    let currentYear = this.state.year
    let currentDate = this.state.day
    if (
      this.props.currentView === 'month' ||
      this.props.currentView === 'events'
    ) {
      //checks which button was pressed and increments/decrements accordingly
      bool ? currentMonth++ : currentMonth--
      //month resets to Jan if next is pressed on Dec
      if (currentMonth === 13) {
        currentMonth = 1
        currentYear++
        //...and month resets to Dec if prev is pressed on Jan
      } else if (currentMonth === 0) {
        currentMonth = 12
        currentYear--
      }
      //sets state to re-render view and updates the month in the store
      this.setState({ month: currentMonth, year: currentYear }, () => {
        this.props.changeDate({
          month: currentMonth,
          year: currentYear,
          day: currentDate
        })
      })
    } else if (this.props.currentView === 'day') {
      let daysInMonth = 31
      let monthsWithThirtyDays = [4, 6, 9, 11]

      //sets max amount of days per month
      if (this.state.month === 2) {
        daysInMonth = 28
      } else if (monthsWithThirtyDays.includes(this.state.month)) {
        daysInMonth = 30
      }

      bool ? currentDate++ : currentDate--
      //if it goes above the days, reset to one
      if (currentDate > daysInMonth) {
        currentDate = 1
      } else if (currentDate === 0) {
        //if days goes to negative, go back to last day in month
        currentDate = daysInMonth
      }
      //sets state and updates current day in the store for single day view to accurately show information
      this.setState({ day: currentDate }, () => {
        this.props.changeDate({
          month: currentMonth,
          year: currentYear,
          day: currentDate
        })
      })
    }
  }

  render() {
    //to toggle state to change the month title to display
    let months = {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December'
    }
    const { month, year } = this.state

    return (
      <Menu className="calendar-header" secondary widths={3}>
        <Menu.Item>
          <Button onClick={() => this.changeView(false)}>&#10094;</Button>
        </Menu.Item>
        <Menu.Item>
          <h2>
            {months[month]} {year}
          </h2>
        </Menu.Item>
        <Menu.Item>
          <Button onClick={() => this.changeView(true)}>&#10095;</Button>
        </Menu.Item>
      </Menu>
    )
  }
}
