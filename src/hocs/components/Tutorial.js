import { connect } from 'react-redux'

export const Tutorial = WrappedComponent => {
  function mapStateToProps (state, { parts }) {
    const { search } = state
    const part = search.partIndex && parts[parseInt(search.partIndex)]
    return { part }
  }
  return connect (mapStateToProps)(WrappedComponent)
}
