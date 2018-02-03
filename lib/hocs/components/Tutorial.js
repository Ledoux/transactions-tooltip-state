'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tutorial = undefined;

var _reactRedux = require('react-redux');

var _guide = require('../../reducers/guide');

var Tutorial = exports.Tutorial = (0, _reactRedux.connect)(function (state, _ref) {
  var parts = _ref.parts;
  return { part: (0, _guide.getPartTutorial)(state, parts) };
});