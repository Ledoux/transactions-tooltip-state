import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { createSelector } from 'reselect'
import { getUpdatedSearchString } from 'transactions-redux-react'

const getVisibleHelpers = createSelector(
  ({ router: { location: { pathname } } }) => pathname,
  (state, { helpers }) => helpers,
  (pathname, helpers) => helpers && helpers.filter(helper =>
      helper.pathname === pathname))

export const PartContent = WrappedComponent => {
  class _PartContent extends Component {
    constructor () {
      super ()
      this.state = { isPrevious: false }
      this.handleStepInit = this._handleStepInit.bind(this)
      this.handleStepUpdate = this._handleStepUpdate.bind(this)
      this.handleStepReset = this._handleStepReset.bind(this)
      this.onNextClick = this._onNextClick.bind(this)
      this.onPreviousClick = this._onPreviousClick.bind(this)
    }
    _handleStepInit (props, prevProps = {}) {
      const { pathname,
        search,
        stepIndex
      } = props
      if (search.tutorialName && (!stepIndex || pathname !== prevProps.pathname)) {
        this.handleStepUpdate(props, 0)
      }
    }
    _handleStepUpdate (props, helperIndex) {
      const { push,
        search
      } = props
      const nextSearch = getUpdatedSearchString(search, {
        helperIndex
      })
      push({ search: nextSearch })
    }
    _handleStepReset () {
    }
    _onNextClick (stepIndex) {
      this.props.trackEvent('PartContent', 'nextClick')
      this.handleStepUpdate(this.props, stepIndex + 1)
    }
    _onPreviousClick (stepIndex) {
      this.props.trackEvent('PartContent', 'previousClick')
      this.handleStepUpdate(this.props, stepIndex - 1)
    }
    componentWillMount () {
      this.handleStepInit(this.props)
    }
    componentWillReceiveProps (nextProps) {
      this.handleStepInit(nextProps, this.props)
    }
    componentDidUpdate (prevProps) {
      // when we want to go back, we need actually
      // to force one time a refresh to reload all the helpers
      // in the same group
      const { isPrevious,
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
        {...this.state}
        handleStepReset={this.handleStepReset}
        onNextClick={this.onNextClick}
        onPreviousClick={this.onPreviousClick} />
    }
  }
  return connect((state, ownProps) => {
    const { router: { location: { pathname }, search },
      tracking: { trackEvent }
    } = state
    const visibleHelpers = getVisibleHelpers(state, ownProps)
    return { pathname,
      search,
      stepIndex: parseInt(search.helperIndex),
      trackEvent,
      visibleHelpers
    }
  }, { push })(_PartContent)
}
