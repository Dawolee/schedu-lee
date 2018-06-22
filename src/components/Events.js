import React, { Component } from 'react'
import { Menu, Button, Form, Input } from 'semantic-ui-react'

export default class Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startTime: '10:00',
      startTimeAmPm: 'AM',
      endTime: '2:00',
      endTimeAmPm: 'PM'
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTimeStart = this.handleTimeStart.bind(this)
    this.handleTimeEnd = this.handleTimeEnd.bind(this)
  }

  handleSubmit(event) {
    let {
      month,
      year,
      date,
      createEvent,
      handleClose,
      type,
      updateEvent,
      id
    } = this.props
    let { startTime, startTimeAmPm, endTime, endTimeAmPm } = this.state

    //creates the event object to match our database model
    let eventObj = {}
    eventObj.name = event.target.name.value
    eventObj.description = event.target.description.value
    eventObj.month = month
    eventObj.day = date
    eventObj.startTime = startTime + startTimeAmPm
    eventObj.endTime = endTime + endTimeAmPm
    eventObj.year = year

    //sends the eventObj to the backend for update or create, depending on the type of button was pressed
    if (type === 'edit') {
      updateEvent(id, eventObj)
    } else {
      createEvent(eventObj)
    }
    //and closes the popup window
    handleClose()
  }

  handleTimeStart(e, { value }) {
    //checks which dropdown option was changed
    if (value === 'AM' || value === 'PM') {
      this.setState({ startTimeAmPm: value })
    } else {
      this.setState({ startTime: value })
    }
  }

  handleTimeEnd(e, { value, key }) {
    //checks which dropdown option was changed
    if (value === 'AM' || value === 'PM') {
      this.setState({ endTimeAmPm: value })
    } else {
      this.setState({ endTime: value })
    }
  }

  render() {
    const timeOptions = []
    const ampmOptions = [
      { key: 'AM', value: 'AM', text: 'AM' },
      { key: 'PM', value: 'PM', text: 'PM' }
    ]
    //form creator help function
    const FormSelect = (fn, options, defaultVal) => {
      return (
        <Form.Select
          fluid
          onChange={fn}
          defaultValue={defaultVal}
          options={options}
        />
      )
    }
    //creates hour options to select from
    for (let i = 1; i <= 12; i++) {
      timeOptions.push({ key: `${i}:00`, value: `${i}:00`, text: `${i}:00` })
      timeOptions.push({
        key: `${i}:30`,
        value: `${i}:30`,
        text: `${i}:30`
      })
    }
    let { type, id, events } = this.props
    return (
      <div>
        <Form onSubmit={this.handleSubmit} size="small">
          <Form.Field required={true}>
            <label>Event Name</label>
            <input name="name" placeholder="Event Name Here..." />
          </Form.Field>
          <label className="form-label">Start Time</label>
          <Form.Group name="startTime" widths="equal">
            {FormSelect(this.handleTimeStart, timeOptions, '10:00')}
            {FormSelect(this.handleTimeStart, ampmOptions, 'AM')}
          </Form.Group>
          <label className="form-label">End Time</label>
          <Form.Group widths="equal">
            {FormSelect(this.handleTimeEnd, timeOptions, '2:00')}
            {FormSelect(this.handleTimeEnd, ampmOptions, 'PM')}
          </Form.Group>
          <Form.TextArea
            name="description"
            placeholder="Type event description in here..."
          />
          {type !== 'edit' ? (
            <Button className="form-btn" color="green" inverted>
              Submit
            </Button>
          ) : (
            <Button className="form-btn" color="blue" inverted>
              Edit
            </Button>
          )}
        </Form>
      </div>
    )
  }
}
