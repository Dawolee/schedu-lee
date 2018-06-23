import React, { Component } from 'react'
import { Calendar, Toggleview, Month, Navbar, Routes } from './components'

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
