'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

var _transactionsInterfaceState = require('transactions-interface-state');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Helpers = function Helpers(WrappedComponent) {
  var _Helpers = function (_Component) {
    _inherits(_Helpers, _Component);

    function _Helpers() {
      _classCallCheck(this, _Helpers);

      var _this = _possibleConstructorReturn(this, (_Helpers.__proto__ || Object.getPrototypeOf(_Helpers)).call(this));

      _this.state = { isPrevious: false };
      return _this;
    }

    _createClass(_Helpers, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        // reset the index
        var search = (0, _transactionsInterfaceState.getUpdatedSearchString)({
          helperStepIndex: 0
        });
        this.props.push({ search: search });
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        // when we want to go back, we need actually
        // to force one time a refresh to reload all the tooltips
        // in the same group
        var _props = this.props,
            isPrevious = _props.isPrevious,
            pathname = _props.pathname,
            stepIndex = _props.stepIndex;

        if (!isPrevious && stepIndex < prevProps.stepIndex) {
          this.setState({ isPrevious: true });
          return;
        }
        if (isPrevious && stepIndex > prevProps.stepIndex) {
          this.setState({ isPrevious: false });
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(WrappedComponent, _extends({}, this.props, {
          state: this.state }));
      }
    }]);

    return _Helpers;
  }(_react.Component);

  _Helpers.helpersByCollectionName = {
    helpersByCollectionName: {}
  };
  return (0, _reactRedux.connect)(null, { push: _reactRouterRedux.push })(_Helpers);
};