import React, { Component } from 'react'
import { Popup } from 'semantic-ui-react'
import { ColumnCreator } from './HelperFunctions'
import Events from './EventsContainer'

export default class PopupForm extends Component {
  constructor(props) {
    super(props)
    this.state = { isOpen: false }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen() {
    this.setState({ isOpen: true })
  }

  handleClose() {
    this.setState({ isOpen: false })
  }
  render() {
    let { month, date, year, eventsObj } = this.props
    return (
      <Popup
        hideOnScroll
        open={this.state.isOpen}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
        position="left center"
        trigger={ColumnCreator('grid-date', 'left', date, 'dates', eventsObj)}
        on="click"
      >
        <Popup.Header>
          Add Event to {month}/{date}/{year}
        </Popup.Header>{' '}
        <Popup.Content>
          <Events
            month={month}
            date={date}
            year={year}
            handleClose={this.handleClose}
          />
        </Popup.Content>
      </Popup>
    )
  }
}
