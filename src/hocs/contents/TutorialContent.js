import { withRouter } from 'react-router'
import { join } from 'transactions-cms-state'
import { withComputedProps } from 'transactions-redux-react'
import { compose } from 'redux'

export const TutorialContent = compose(
  withRouter,
  join('tutorials', 'active'),
  withComputedProps({
    part: ({ location: { query: { partIndex } }, parts }) =>
      parts && partIndex && parts[partIndex]
  })
)
