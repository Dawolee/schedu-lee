import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'

export default class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      month: 1
    }
  }
  render() {
    return (
      <Grid>
        <Grid.Row columns={7}>
          <Grid.Column>Su</Grid.Column>
          <Grid.Column>Mo</Grid.Column>
          <Grid.Column>Tu</Grid.Column>
          <Grid.Column>We</Grid.Column>
          <Grid.Column>Th</Grid.Column>
          <Grid.Column>Fr</Grid.Column>
          <Grid.Column>Sa</Grid.Column>
        </Grid.Row>
        <Grid.Row columns={7}>
          <Grid.Column>hi</Grid.Column>
          <Grid.Column>hi</Grid.Column>
          <Grid.Column>hi</Grid.Column>
          <Grid.Column>hi</Grid.Column>
          <Grid.Column>hi</Grid.Column>
          <Grid.Column>hi</Grid.Column>
          <Grid.Column>hi</Grid.Column>
        </Grid.Row>
        <Grid.Row columns={7}>
          <Grid.Column>hi</Grid.Column>
          <Grid.Column>hi</Grid.Column>
          <Grid.Column>hi</Grid.Column>
          <Grid.Column>hi</Grid.Column>
          <Grid.Column>hi</Grid.Column>
          <Grid.Column>hi</Grid.Column>
          <Grid.Column>hi</Grid.Column>
        </Grid.Row>
        <Grid.Row columns={7}>
          <Grid.Column>hi</Grid.Column>
          <Grid.Column>hi</Grid.Column>
          <Grid.Column>hi</Grid.Column>
          <Grid.Column>hi</Grid.Column>
          <Grid.Column>hi</Grid.Column>
          <Grid.Column>hi</Grid.Column>
          <Grid.Column>hi</Grid.Column>
        </Grid.Row>
        <Grid.Row columns={7}>
          <Grid.Column>hi</Grid.Column>
          <Grid.Column>hi</Grid.Column>
          <Grid.Column>hi</Grid.Column>
          <Grid.Column>hi</Grid.Column>
          <Grid.Column>hi</Grid.Column>
          <Grid.Column>hi</Grid.Column>
          <Grid.Column>hi</Grid.Column>
        </Grid.Row>
        <Grid.Row columns={7}>
          <Grid.Column>hi</Grid.Column>
          <Grid.Column>hi</Grid.Column>
          <Grid.Column>hi</Grid.Column>
          <Grid.Column>hi</Grid.Column>
          <Grid.Column>hi</Grid.Column>
          <Grid.Column>hi</Grid.Column>
          <Grid.Column>hi</Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
