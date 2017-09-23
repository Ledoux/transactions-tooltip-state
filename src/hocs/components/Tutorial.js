import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { getUpdatedSearchString } from 'transactions-interface-state'

export const Tutorial = WrappedComponent => {
  class _Tutorial extends Component {
    constructor () {
      super ()
      this.state = { isPrevious: false }
      this.handleStepInit = this._handleStepInit.bind(this)
      this.handleStepReset = this._handleStepReset.bind(this)
      this.handleStepUpdate = this._handleStepUpdate.bind(this)
      this.onNextClick = this._onNextClick.bind(this)
      this.onPreviousClick = this._onPreviousClick.bind(this)
    }
    _handleStepInit (props) {
      const { search,
        stepIndex
      } = props
      if (search.tutorialCollectionName && !stepIndex) {
        this.handleStepUpdate(props, 0)
      }
    }
    _handleStepUpdate (props, helperStepIndex) {
      const { push,
        search
      } = props
      const nextSearch = getUpdatedSearchString(search, {
        helperStepIndex
      })
      push({ search: nextSearch })
    }
    _handleStepReset () {
      /*
      const { push,
        search
      } = this.props
      if (search.helperStepIndex) {
        delete search.helperStepIndex
      }
      push({ search: getUpdatedSearchString(search) })
      */
    }
    _onNextClick (stepIndex) {
      this.handleStepUpdate(this.props, stepIndex + 1)
    }
    _onPreviousClick (stepIndex) {
      this.handleStepUpdate(this.props, stepIndex - 1)
    }
    componentWillMount () {
      this.handleStepInit(this.props)
    }
    componentWillReceiveProps (nextProps) {
      this.handleStepInit(nextProps)
    }
    componentDidUpdate (prevProps) {
      // when we want to go back, we need actually
      // to force one time a refresh to reload all the helpers
      // in the same group
      const { isPrevious,
        pathname,
        stepIndex
      } = this.props
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
        state={this.state}
        handleStepReset={this.handleStepReset}
        onNextClick={this.onNextClick}
        onPreviousClick={this.onPreviousClick} />
    }
  }
  function mapStateToProps ({ router: { location: { pathname } },
    search,
    tutorial
  }) {
    const helpers = search.tutorialCollectionName &&
      tutorial[search.tutorialCollectionName]
    const stepIndex = search.helperStepIndex && parseInt(search.helperStepIndex)
    return { helpers,
      pathname,
      search,
      stepIndex
    }
  }
  return connect(mapStateToProps, { push })(_Tutorial)
}
