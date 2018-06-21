import React, { Component } from 'react'
import { Calendar, Togglebar, Month, Navbar } from './components'

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Month />
        <Togglebar />
        <Calendar />
      </div>
    )
  }
}
