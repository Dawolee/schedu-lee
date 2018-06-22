import React, { Component } from 'react'
import { Popup, Grid, Button, Card } from 'semantic-ui-react'
import Events from './EventsContainer'
import { connect } from 'react-redux'
import { deleteEventFromDb } from '../store/events'

class PopupForm extends Component {
  constructor(props) {
    super(props)
    this.state = { isOpen: false, edit: false }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  handleOpen() {
    this.setState({ isOpen: true })
  }

  handleClose() {
    this.setState({ isOpen: false, edit: false })
  }

  handleDelete(id) {
    this.props.deleteEvent(id)
  }

  handleEdit() {
    this.setState({ edit: true }, () => {})
  }

  render() {
    let { month, date, year, eventsObj } = this.props
    //stores names and properties of all events for specific date
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
      <Grid.Column className="grid-date" width={2} key={date} textAlign="left">
        <Popup
          hideOnScroll
          open={this.state.isOpen}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
          position="left center"
          trigger={
            <Button color="black" basic animated size="mini">
              <Button.Content visible>{date}</Button.Content>
              <Button.Content hidden>Add</Button.Content>
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
          {/* For each event in a date, creates a
          popup that allows you to either edit or delete
          the event*/}
          {name &&
            name.map(n => {
              return (
                <Popup
                  wide
                  onClose={this.handleClose}
                  key={n.id}
                  position="bottom center"
                  trigger={<div className="popup-trigger">{n.name}</div>}
                  on="focus"
                  hideOnScroll
                >
                  {/* If the current state is not set to edit, renders out the
                  event and it's information, along with the button to edit and delete
                  the event. If current state is set to edit, opens up an edit form */}
                  {!this.state.edit ? (
                    <Card>
                      <Card.Content>
                        <Card.Header textAlign="center">{n.name}</Card.Header>
                        <Card.Meta textAlign="center">
                          {month}/{date} from {n.startTime}-{n.endTime}
                        </Card.Meta>
                        <Card.Description textAlign="center">
                          {n.description}
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
                            onClick={this.handleEdit}
                          />
                          <Button
                            onClick={() => this.handleDelete(n.id)}
                            inverted
                            size="mini"
                            color="red"
                            content="Delete"
                            fluid
                          />
                          } />
                        </div>
                      </Card.Content>
                    </Card>
                  ) : (
                    <Events
                      id={n.id}
                      month={month}
                      date={date}
                      year={year}
                      startTime={n.startTime}
                      endTime={n.endTime}
                      type="edit"
                      handleClose={this.handleClose}
                    />
                  )}
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
