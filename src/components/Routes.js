import React, { Component } from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import { Home, EditEvent } from './index'
import Navbar from './Navbar'

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/edit" component={EditEvent} />
      </Switch>
    )
  }
}

export default withRouter(Routes)
