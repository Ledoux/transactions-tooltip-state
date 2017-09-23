import React, { Component } from 'react'

export const Helper = WrappedComponent => {
  class _Helper extends Component {
    constructor () {
      super ()
      this.state = { hasScrolled: false,
        parentElement: null
      }
      this.getHelperElement = this._getHelperElement.bind(this)
      this.getParentElement = this._getParentElement.bind(this)
    }
    async _getParentElement () {
      // maybe the element was not there yet
      // so we set an interval for searching it
      const { parent } = this.props
      console.log('parent', parent)
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
      if (this.props.isVisible) {
        const parentElement = await this.getParentElement()
        this.setState({ parentElement })
      }
    }
    componentDidUpdate (prevProps) {
      const { active,
        isFirefox,
        position,
        stepIndex
      } = this.props
      const { hasScrolled,
        parentElement
      } = this.state
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
    componentWillUnmount () {
      if (this.findHelperElementInterval) {
        clearInterval(this.findHelperElementInterval)
      }
      if (this.findParentElementInterval) {
        clearInterval(this.findParentElementInterval)
      }
    }
    render () {
      return <WrappedComponent {...this.props}
        state={this.state}
        setHelperElement={_e => this.helperElement = _e} />
    }
  }
  return _Helper
}
