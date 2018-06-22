import React, { Component } from 'react'
import { Popup, Grid, Button } from 'semantic-ui-react'
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
    //stores names of all events for specific date
    let name = []
    if (eventsObj !== null && eventsObj[date]) {
      eventsObj[date].forEach(event =>
        name.push({ name: event.name, id: event.id })
      )
    }
    return (
      <Grid.Column
        className="grid-date"
        width={2}
        key={date}
        textAlign="center"
      >
        <Popup
          hideOnScroll
          open={this.state.isOpen}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
          position="left center"
          trigger={
            <Button size="mini" className="popup-trigger">
              {date}
            </Button>
          }
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
        <div className="grid-date-inner">
          {name &&
            name.map(n => {
              return (
                <Popup
                  key={n.id}
                  hideOnScroll
                  position="right center"
                  trigger={<p className="popup-trigger">{n.name}</p>}
                  on="click"
                >
                  <Popup.Header>Edit Event: {n.name}</Popup.Header>{' '}
                  <Popup.Content>
                    <Events
                      id={n.id}
                      month={month}
                      date={date}
                      year={year}
                      handleClose={this.handleClose}
                      type="edit"
                    />
                  </Popup.Content>
                </Popup>
              )
            })}
        </div>
      </Grid.Column>
    )
  }
}
