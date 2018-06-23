import React, { Component } from 'react'
import { Popup, Button, Card, Menu } from 'semantic-ui-react'
import { Events } from './index'

export default class SingleDayView extends Component {
  constructor(props) {
    super(props)
    this.state = { isOpen: false, edit: false, currentEvent: null }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  handleOpen() {
    this.setState({ isOpen: true })
  }

  handleClose() {
    //The Event Component calls handleClose after it updates the currently selected event and then sets edit and current event to false to reset the view
    this.setState({ isOpen: false, edit: false }, () => {
      this.setState({ edit: false, currentEvent: null })
    })
  }

  handleDelete(id) {
    this.props.deleteEvent(id)
  }

  handleEdit(id) {
    this.setState({ edit: true, currentEvent: id })
  }

  render() {
    let { events } = this.props
    let { day, month, year } = this.props.currentDate
    let sortedEvents = events.filter(event => event.day === day)
    return (
      <div>
        <Menu compact borderless attached widths={2}>
          <Menu.Item position="left">
            <h2>
              Events for {month}/{day}/{year}
            </h2>
          </Menu.Item>
          <Menu.Item position="right">
            <Popup
              hideOnScroll
              open={this.state.isOpen}
              onClose={this.handleClose}
              onOpen={this.handleOpen}
              position="left center"
              trigger={
                <Button circular color="black" size="large">
                  Create New Event For This Date
                </Button>
              }
              on="click"
            >
              <Popup.Header>
                Add Event to {month}/{day}/{year}
              </Popup.Header>
              <Popup.Content>
                <Events
                  month={month}
                  date={day}
                  year={year}
                  handleClose={this.handleClose}
                />
              </Popup.Content>
            </Popup>
          </Menu.Item>
        </Menu>

        <div className="single-day-cards">
          {/* prints when there are no events for the current date */}
          {!sortedEvents.length && (
            <h3 className="no-events">
              You Have No Events Planned For This Date
            </h3>
          )}
          {sortedEvents.length > 0 &&
            sortedEvents.map(event => {
              return (
                <div>
                  {this.state.currentEvent !== event.id ? (
                    <Card>
                      <Card.Content>
                        <Card.Header textAlign="center">
                          {event.name}
                        </Card.Header>
                        <Card.Meta textAlign="center">
                          {event.month}/{event.day} from {event.startTime}-{
                            event.endTime
                          }
                        </Card.Meta>
                        <Card.Description textAlign="center">
                          {event.description}
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <div className="ui two buttons">
                          <Button
                            size="mini"
                            color="green"
                            content="Edit"
                            fluid
                            inverted
                            onClick={() => this.handleEdit(event.id)}
                          />
                          <Button
                            onClick={() => this.handleDelete(event.id)}
                            inverted
                            size="mini"
                            color="red"
                            content="Delete"
                            fluid
                          />{' '}
                          } />
                        </div>
                      </Card.Content>
                    </Card>
                  ) : (
                    <Events
                      id={event.id}
                      month={event.month}
                      date={event.date}
                      year={event.year}
                      startTime={event.startTime}
                      endTime={event.endTime}
                      type="edit"
                      handleClose={this.handleClose}
                    />
                  )}
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}
