import React, { Component } from 'react'
import { Calendar, Togglebar, Month, Navbar, Routes } from './components'

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    )
  }
}
