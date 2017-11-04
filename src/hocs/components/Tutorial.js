import { connect } from 'react-redux'

export const Tutorial = WrappedComponent => {
  function mapStateToProps ({ router: { search } }, { parts }) {
    const part = search.partIndex && parts[parseInt(search.partIndex)]
    return { part }
  }
  return connect (mapStateToProps)(WrappedComponent)
}
