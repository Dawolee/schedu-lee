import React, { Component } from 'react'
import { Menu, Button, Container } from 'semantic-ui-react'

export default class Toggleview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'month'
    }
    this.changeView = this.changeView.bind(this)
  }

  //function to change between monthly and daily views
  changeView(e, { name }) {
    //sets its local state and then dispatches to update the state in the store
    this.setState({ view: name }, () => {
      this.props.viewChange(name)
    })
  }

  render() {
    return (
      <Container className="toggle">
        <Menu secondary color="green" inverted widths={3}>
          <Menu.Item
            name="events"
            active={this.state.view === 'events'}
            onClick={this.changeView}
          >
            All Events for Month
          </Menu.Item>
          <Menu.Item
            name="month"
            active={this.state.view === 'month'}
            onClick={this.changeView}
          />
          <Menu.Item
            name="day"
            active={this.state.view === 'day'}
            onClick={this.changeView}
          />
        </Menu>
      </Container>
    )
  }
}
