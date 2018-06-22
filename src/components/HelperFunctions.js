import { Grid, Popup } from 'semantic-ui-react'
import React from 'react'
import PopupForm from './PopupForm'

export const ColumnCreator = (
  className,
  textAlign,
  key,
  type,
  eventsObj = null
) => {
  if (type === 'days') {
    return (
      <Grid.Column
        className={className}
        width={2}
        key={key}
        textAlign={textAlign}
      >
        {key}
      </Grid.Column>
    )
  } else if (type === 'dates') {
    let name = []
    if (eventsObj !== null && eventsObj[key]) {
      eventsObj[key].forEach(event => name.push(event.name))
    }
    return (
      <Grid.Column
        className={className}
        width={2}
        key={key}
        textAlign={textAlign}
      >
        {key}
        {name &&
          name.map(n => {
            return <p>{n}</p>
          })}
      </Grid.Column>
    )
  } else {
    return (
      <Grid.Column
        className={className}
        width={2}
        key={key}
        textAlign={textAlign}
      />
    )
  }
}

export const DayRowCreator = () => {
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return (
    <Grid.Row className="grid-day-row" centered>
      {days.map(day => {
        return ColumnCreator('grid-day', 'center', day, 'days')
      })}
    </Grid.Row>
  )
}

export const DatesRowCreator = (
  numOfCols,
  numOfDates,
  month,
  year,
  eventsObj
) => {
  let columns = []
  while (numOfCols > 0 && numOfDates <= 35) {
    numOfDates <= 31
      ? columns.push(
          <PopupForm
            date={numOfDates}
            year={year}
            month={month}
            eventsObj={eventsObj}
          />
        )
      : columns.push(ColumnCreator('grid-date', 'left', numOfDates))
    numOfDates++
    numOfCols--
  }
  return (
    <Grid.Row className="grid-dates-row" centered>
      {columns}
    </Grid.Row>
  )
}
