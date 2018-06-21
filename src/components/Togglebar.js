import React, { Component } from 'react'
import { Menu, Button } from 'semantic-ui-react'

export default class Togglebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'month'
    }
    this.changeView = this.changeView.bind(this)
  }

  changeView(e, { name }) {
    this.setState({ view: name }, () => {
      console.log(this.state)
    })
  }

  render() {
    return (
      <Menu secondary color="green" inverted widths={3}>
        <Menu.Item
          name="month"
          active={this.state.view === 'month'}
          onClick={this.changeView}
        />
        <Menu.Item
          name="week"
          active={this.state.view === 'week'}
          onClick={this.changeView}
        />
        <Menu.Item
          name="day"
          active={this.state.view === 'day'}
          onClick={this.changeView}
        />
      </Menu>
    )
  }
}
