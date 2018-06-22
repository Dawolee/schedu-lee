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
  //maps through the days and creates a column for each
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
  currentDate,
  month,
  year,
  eventsObj,
  startingDay
) => {
  let daysInMonth = 31
  let monthsWithThirtyDays = [4, 6, 9, 11]

  //sets max amount of days per month
  if (month === 2) {
    daysInMonth = 28
  } else if (monthsWithThirtyDays.includes(month)) {
    daysInMonth = 30
  }

  let columns = []
  //inputs blank columns to fill in space before starting date
  while (startingDay > 0) {
    columns.push(ColumnCreator('grid-date', 'left', startingDay))
    startingDay--
  }
  while (columns.length < numOfCols) {
    {
      /* If the dates in the month are not all filled out,
    push popup forms, otherwise put in more blank spaces to fill
    out the calendar */
    }
    currentDate <= daysInMonth
      ? columns.push(
          <PopupForm
            date={currentDate}
            year={year}
            month={month}
            eventsObj={eventsObj}
          />
        )
      : columns.push(ColumnCreator('grid-date', 'left', currentDate))
    currentDate++
  }
  return (
    <Grid.Row columns={7} className="grid-dates-row" centered>
      {columns}
    </Grid.Row>
  )
}

export const EventColumnCreator = (type, name) => {
  if (type === 'header') {
    return (
      <Grid.Column textAlign="center">
        <h4>{name}</h4>
      </Grid.Column>
    )
  } else {
    return (
      <Grid.Column textAlign="center">
        <p>{name}</p>
      </Grid.Column>
    )
  }
}
