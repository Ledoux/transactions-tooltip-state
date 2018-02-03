'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TutorialContent = undefined;

var _reactRouter = require('react-router');

var _transactionsCmsState = require('transactions-cms-state');

var _transactionsReduxReact = require('transactions-redux-react');

var _redux = require('redux');

var TutorialContent = exports.TutorialContent = (0, _redux.compose)(_reactRouter.withRouter, (0, _transactionsCmsState.join)('tutorials', 'active'), (0, _transactionsReduxReact.withComputedProps)({
  part: function part(_ref) {
    var partIndex = _ref.location.query.partIndex,
        parts = _ref.parts;
    return parts && partIndex && parts[partIndex];
  }
}));