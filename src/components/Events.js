import React, { Component } from 'react'
import { Menu, Button, Form, Input } from 'semantic-ui-react'

export default class Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'submit',
      startTime: {},
      endTime: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    let { month, year, date, createEvent, handleClose } = this.props
    //creates the event object to match our database model
    let eventObj = {}
    eventObj.name = event.target.name.value
    eventObj.description = event.target.description.value
    eventObj.month = month
    eventObj.day = date
    eventObj.year = year
    //sends the eventObj to the backend
    createEvent(eventObj)
    //and closes the popup window
    handleClose()
  }

  handleChange(e, { value }) {}

  render() {
    const hrOptions = []
    const minOptions = [
      { key: 0, value: 0, text: '00' },
      { key: 15, value: 15, text: '15' },
      { key: 30, value: 30, text: '30' },
      { key: 45, value: 45, text: '45' }
    ]
    const ampmOptions = [
      { key: 'AM', value: 'AM', text: 'AM' },
      { key: 'PM', value: 'PM', text: 'PM' }
    ]
    //form creator help function
    const FormSelect = (fun, label, options, defaultVal) => {
      return (
        <Form.Select
          fluid
          onChange={this.handleChange}
          defaultValue={defaultVal}
          label={label}
          options={options}
        />
      )
    }
    //creates hour options to select from
    for (let i = 1; i <= 12; i++) {
      hrOptions.push({ key: i, value: i, text: i })
    }
    let { type } = this.state
    return (
      <Form onSubmit={this.handleSubmit} size="small">
        <Form.Field required={true}>
          <label>Event Name</label>
          <input name="name" placeholder="Event Name Here..." />
        </Form.Field>
        <label className="form-label">Start Time</label>
        <Form.Group name="startTime" widths="equal">
          {FormSelect('startHr', 'Hr', hrOptions, 12)}
          {FormSelect('startMin', 'Min', minOptions, 0)}
          {FormSelect('startAMPM', 'AM/PM', ampmOptions, 'PM')}
        </Form.Group>
        <label className="form-label">End Time</label>
        <Form.Group widths="equal">
          {FormSelect('endHr', 'Hr', hrOptions, 1)}
          {FormSelect('endMin', 'Min', minOptions, 0)}
          {FormSelect('endAMPM', 'AM/PM', ampmOptions, 'PM')}
        </Form.Group>
        <Form.TextArea
          name="description"
          placeholder="Type event description in here..."
        />
        <Form.Button>Submit</Form.Button>
      </Form>
    )
  }
}
