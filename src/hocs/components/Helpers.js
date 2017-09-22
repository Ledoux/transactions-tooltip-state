import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { getUpdatedSearchString } from 'transactions-interface-state'

const Helpers = WrappedComponent => {
  class _Helpers extends Component {
    constructor () {
      super ()
      this.state = { isPrevious: false }
    }
    componentDidMount () {
      // reset the index
      const search = getUpdatedSearchString({
        helperStepIndex: 0
      })
      this.props.push({ search })
    }
    componentDidUpdate (prevProps) {
      // when we want to go back, we need actually
      // to force one time a refresh to reload all the tooltips
      // in the same group
      const { isPrevious,
        pathname,
        stepIndex } = this.props
      if (!isPrevious && stepIndex < prevProps.stepIndex) {
        this.setState({ isPrevious: true })
        return
      }
      if (isPrevious && stepIndex > prevProps.stepIndex) {
        this.setState({ isPrevious: false })
      }
    }
    render () {
      return <WrappedComponent {...this.props}
        state={this.state} />
    }
  }
  _Helpers.helpersByCollectionName = {
    helpersByCollectionName: {}
  }
  return connect(null, { push })(_Helpers)
}
