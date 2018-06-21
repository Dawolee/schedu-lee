import React, { Component } from 'react'
import { Menu, Button, Container } from 'semantic-ui-react'

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      month: 1
    }
    this.changeMonth = this.changeView.bind(this)
  }

  changeView(bool) {
    let currentMonth = this.state.month
    //checks which button was pressed and increments/decrements accordingly
    bool ? currentMonth++ : currentMonth--
    //month resets to Jan if next is pressed on Dec
    if (currentMonth === 13) {
      currentMonth = 1
      //...and month resets to Dec if prev is pressed on Jan
    } else if (currentMonth === 0) {
      currentMonth = 12
    }
    this.setState({ month: currentMonth })
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
    return (
      <Menu secondary widths={3}>
        <Menu.Item>
          <Button onClick={() => this.changeView(false)}>&#10094;</Button>
        </Menu.Item>
        <Menu.Item>
          <h2>{months[this.state.month]} 2018</h2>
        </Menu.Item>
        <Menu.Item>
          <Button onClick={() => this.changeView(true)}>&#10095;</Button>
        </Menu.Item>
      </Menu>
    )
  }
}
