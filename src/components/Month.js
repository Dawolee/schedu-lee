import React, { Component } from 'react'
import { Menu, Button, Container } from 'semantic-ui-react'

export default class Month extends Component {
  constructor(props) {
    super(props)
    this.state = {
      month: 1,
      year: 2018
    }
    this.changeView = this.changeView.bind(this)
  }

  changeView(bool) {
    let currentMonth = this.state.month
    let currentYear = this.state.year
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
      this.props.changeDate({ month: currentMonth, year: currentYear })
    })
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
