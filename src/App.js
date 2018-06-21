import React, { Component } from 'react'
import { Calendar, Togglebar, Header } from './components'
import { Container } from 'semantic-ui-react'

export default class App extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Togglebar />
        <Calendar />
      </Container>
    )
  }
}
