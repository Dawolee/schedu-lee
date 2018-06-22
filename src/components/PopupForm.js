import React, { Component } from 'react'
import { Popup, Grid, Button, Card } from 'semantic-ui-react'
import Events from './EventsContainer'
import { connect } from 'react-redux'
import { deleteEventFromDb } from '../store/events'

class PopupForm extends Component {
  constructor(props) {
    super(props)
    this.state = { isOpen: false }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleOpen() {
    this.setState({ isOpen: true })
  }

  handleClose() {
    this.setState({ isOpen: false })
  }

  handleDelete(id) {
    this.props.deleteEvent(id)
  }

  render() {
    let { month, date, year, eventsObj } = this.props
    //stores names of all events for specific date
    let name = []
    if (eventsObj !== null && eventsObj[date]) {
      eventsObj[date].forEach(event =>
        name.push({
          name: event.name,
          id: event.id,
          description: event.description,
          startTime: event.startTime,
          endTime: event.endTime
        })
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
                  position="bottom center"
                  trigger={<p className="popup-trigger">{n.name}</p>}
                  on="focus"
                  hideOnScroll
                >
                  <Card>
                    <Card.Content>
                      <Card.Header>{n.name}</Card.Header>
                      <Card.Meta>
                        {month}/{date}
                      </Card.Meta>
                      <Card.Description>{n.description}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <div className="ui two buttons">
                        <Popup
                          trigger={
                            <Button
                              size="mini"
                              basic
                              color="green"
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
                        <Popup
                          trigger={
                            <Button
                              onClick={() => this.handleDelete(n.id)}
                              size="mini"
                              color="red"
                              basic
                              content="Delete"
                              fluid
                            />
                          }
                        />
                      </div>
                    </Card.Content>
                  </Card>
                </Popup>
              )
            })}
        </div>
      </Grid.Column>
    )
  }
}

const mapState = state => {
  return {
    events: state.events
  }
}

//allows the delete button to dispatch the event deletion to the backend

const mapDispatch = dispatch => {
  return {
    deleteEvent: id => {
      dispatch(deleteEventFromDb(id))
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(PopupForm)
