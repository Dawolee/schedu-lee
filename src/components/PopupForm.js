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
                  wide
                  key={n.id}
                  hideOnScroll
                  position="bottom center"
                  trigger={<p className="popup-trigger">{n.name}</p>}
                  on="click"
                >
                  <Grid divided columns="equal">
                    <Grid.Column>
                      <Popup
                        trigger={
                          <Button
                            size="mini"
                            color="blue"
                            content="Edit"
                            fluid
                          />
                        }
                        size="tiny"
                        on="focus"
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
                    </Grid.Column>
                    <Grid.Column>
                      <Popup
                        trigger={
                          <Button
                            size="mini"
                            color="red"
                            content="Delete"
                            fluid
                          />
                        }
                        content="Stay in Wonderland, and I show you how deep the rabbit hole goes."
                        position="top center"
                        size="tiny"
                        inverted
                      />
                    </Grid.Column>
                  </Grid>
                </Popup>
              )
            })}
        </div>
      </Grid.Column>
    )
  }
}
