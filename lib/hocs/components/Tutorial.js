'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tutorial = undefined;

var _reactRedux = require('react-redux');

var Tutorial = exports.Tutorial = function Tutorial(WrappedComponent) {
  function mapStateToProps(_ref, _ref2) {
    var search = _ref.router.search;
    var parts = _ref2.parts;

    var part = search.partIndex && parts[parseInt(search.partIndex)];
    return { part: part };
  }
  return (0, _reactRedux.connect)(mapStateToProps)(WrappedComponent);
};