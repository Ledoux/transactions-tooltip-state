'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Guide = undefined;

var _reactRedux = require('react-redux');

var _guide = require('../../reducers/guide');

var Guide = exports.Guide = function Guide(WrappedComponent) {
  function mapStateToProps(state) {
    var search = state.search;

    var tutorial = search.tutorialName && (0, _guide.getGuideTutorial)(state, search.tutorialName);
    return { tutorial: tutorial };
  }
  return (0, _reactRedux.connect)(mapStateToProps)(WrappedComponent);
};