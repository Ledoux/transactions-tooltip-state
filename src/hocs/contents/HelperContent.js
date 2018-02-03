import React, { Component } from 'react'
import { connect } from 'react-redux'
import { findDOMNode } from 'react-dom'

import { getViewerComponent } from 'transactions-interface-state'

export const HelperContent = WrappedComponent => {
  class _HelperContent extends Component {
    constructor () {
      super ()
      this.state = { hasScrolled: false,
        parentElement: null
      }
      this.getHelperElement = this._getHelperElement.bind(this)
      this.getParentElement = this._getParentElement.bind(this)
      this.setHelperElement = this._setHelperElement.bind(this)
    }
    async _getParentElement () {
      // maybe the element was not there yet
      // so we set an interval for searching it
      const { parent } = this.props
      const parentElement = document.querySelector(parent) ||
        await new Promise((resolve, reject) => {
          this.findParentElementInterval = setInterval(() => {
            const parentElement = document.querySelector(parent)
            if (parentElement) {
              clearInterval(this.findParentElementInterval)
              resolve(parentElement)
            }
          }, 100)
        })
      return parentElement
    }
    async _getHelperElement () {
      // maybe the element was not there yet
      // so we set an interval for searching it
      return this.helperElement ||
        await new Promise((resolve, reject) => {
          this.findHelperElementInterval = setInterval(() => {
            if (this.helperElement) {
              clearInterval(this.findHelperElementInterval)
              resolve(this.helperElement)
            }
          }, 100)
        })
    }
    async componentDidMount () {
      const parentElement = await this.getParentElement()
      /*
      if (this.helperElement.parentElement) {
        const helperParentElement = findDOMNode(this.helperElement.parentElement)
        console.log('OUAI', helperParentElement, this.helperElement.parentElement, parentElement.offsetHeight)
        helperParentElement.style.top = '500px'
      }
      */
      this.setState({ parentElement })
    }
    async componentDidUpdate (prevProps) {
      // unpack
      const { active,
        isFirefox,
        position,
        stepIndex
      } = this.props
      const { hasScrolled } = this.state
      let parentElement = this.state.parentElement
      // check that parent has changed or not
      if (this.props.parent !== prevProps.parent) {
        parentElement = await this.getParentElement()
        this.setState({ parentElement })
      }
      // check for scrolling
      if (parentElement && !hasScrolled && active && stepIndex !== 0) {
        this.setState({ hasScrolled: true })
        this.getHelperElement().then(helperElement => {
          // as this is an absolute positioned
          // element, it will not work in Firefox
          const scrollElement = isFirefox ? parentElement : this.helperElement
          scrollElement.scrollIntoView({
              behavior: 'smooth',
              block: position === 'top' ? 'end' : 'start'
            })
        })
      }
    }
    _setHelperElement (_e) {
      this.helperElement = _e
    }
    componentWillUnmount () {
      if (this.findHelperElementInterval) {
        clearInterval(this.findHelperElementInterval)
      }
      if (this.findParentElementInterval) {
        clearInterval(this.findParentElementInterval)
      }
    }
    render () {
      return <WrappedComponent {...this.props} {...this.state}
        setHelperElement={this.setHelperElement}
        handleStepReset={this.handleStepReset} />
    }
  }
  return connect((state, { contentName }) => ({
    ContentComponent: getViewerComponent(state, 'content', contentName || 'boxes')
  }))(_HelperContent)
}
