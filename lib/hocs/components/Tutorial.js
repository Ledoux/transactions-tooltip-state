'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tutorial = undefined;

var _reactRedux = require('react-redux');

var Tutorial = exports.Tutorial = function Tutorial(WrappedComponent) {
  function mapStateToProps(state, _ref) {
    var parts = _ref.parts;
    var search = state.search;

    var part = search.partIndex && parts[parseInt(search.partIndex)];
    return { part: part };
  }
  return (0, _reactRedux.connect)(mapStateToProps)(WrappedComponent);
};