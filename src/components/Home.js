import React, { Component } from 'react'
import { DateToggle, Calendar, Toggleview } from './index'

export default class Home extends Component {
  render() {
    return (
      <div>
        <DateToggle />
        <Toggleview />
        <Calendar />
      </div>
    )
  }
}
