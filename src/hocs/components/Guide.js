import { connect } from 'react-redux'

import { getGuideTutorial } from '../../reducers/guide'

export const Guide = WrappedComponent => {
  function mapStateToProps (state) {
    const { search } = state
    const tutorial = search.tutorialName && getGuideTutorial(state, search.tutorialName)
    return { tutorial }
  }
  return connect(mapStateToProps)(WrappedComponent)
}
