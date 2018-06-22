import React, { Component } from 'react'
import { Month, Calendar, Togglebar } from './index'

export default class Home extends Component {
  render() {
    return (
      <div>
        <Month />
        <Togglebar />
        <Calendar />
      </div>
    )
  }
}
