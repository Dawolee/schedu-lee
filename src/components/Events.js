import React, { Component } from 'react'
import { Menu, Button, Form, Input } from 'semantic-ui-react'

export default class Events extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props)
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
    const FormSelect = (label, options, defaultVal) => {
      return (
        <Form.Select
          fluid
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
    return (
      <Form size="small">
        <Form.Field required={true}>
          <label>Event Name</label>
          <input placeholder="Event Name Here..." />
        </Form.Field>
        <label className="form-label">Start Time</label>
        <Form.Group widths="equal">
          {FormSelect('Hr', hrOptions, 12)}
          {FormSelect('Min', minOptions, 0)}
          {FormSelect('AM/PM', ampmOptions, 'PM')}
        </Form.Group>
        <label className="form-label">End Time</label>
        <Form.Group widths="equal">
          {FormSelect('Hr', hrOptions, 1)}
          {FormSelect('Min', minOptions, 0)}
          {FormSelect('AM/PM', ampmOptions, 'PM')}
        </Form.Group>
        <Form.TextArea placeholder="Type event description in here..." />
        <Form.Button>Submit</Form.Button>
      </Form>
    )
  }
}
