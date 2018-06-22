import React, { Component } from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import { Home } from './index'

/* was planning on making routes to edit individual events but decided to do
everything on one view */

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    )
  }
}

export default withRouter(Routes)
