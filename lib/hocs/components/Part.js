'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Part = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

var _reselect = require('reselect');

var _transactionsInterfaceState = require('transactions-interface-state');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getVisibleHelpers = (0, _reselect.createSelector)(function (_ref) {
  var pathname = _ref.state.router.location.pathname;
  return pathname;
}, function (_ref2) {
  var helpers = _ref2.ownProps.helpers;
  return helpers;
}, function (pathname, helpers) {
  return helpers && helpers.filter(function (helper) {
    return helper.getIsVisible(pathname);
  });
});

var Part = exports.Part = function Part(WrappedComponent) {
  var _Part = function (_Component) {
    _inherits(_Part, _Component);

    function _Part() {
      _classCallCheck(this, _Part);

      var _this = _possibleConstructorReturn(this, (_Part.__proto__ || Object.getPrototypeOf(_Part)).call(this));

      _this.state = { isPrevious: false };
      _this.handleStepInit = _this._handleStepInit.bind(_this);
      _this.handleStepUpdate = _this._handleStepUpdate.bind(_this);
      _this.handleStepReset = _this._handleStepReset.bind(_this);
      _this.onNextClick = _this._onNextClick.bind(_this);
      _this.onPreviousClick = _this._onPreviousClick.bind(_this);
      return _this;
    }

    _createClass(_Part, [{
      key: '_handleStepInit',
      value: function _handleStepInit(props) {
        var prevProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var pathname = props.pathname,
            search = props.search,
            stepIndex = props.stepIndex;

        if (search.tutorialName && (!stepIndex || pathname !== prevProps.pathname)) {
          this.handleStepUpdate(props, 0);
        }
      }
    }, {
      key: '_handleStepUpdate',
      value: function _handleStepUpdate(props, helperIndex) {
        var push = props.push,
            search = props.search;

        var nextSearch = (0, _transactionsInterfaceState.getUpdatedSearchString)(search, {
          helperIndex: helperIndex
        });
        push({ search: nextSearch });
      }
    }, {
      key: '_handleStepReset',
      value: function _handleStepReset() {}
    }, {
      key: '_onNextClick',
      value: function _onNextClick(stepIndex) {
        this.props.trackEvent('Part', 'nextClick');
        this.handleStepUpdate(this.props, stepIndex + 1);
      }
    }, {
      key: '_onPreviousClick',
      value: function _onPreviousClick(stepIndex) {
        this.props.trackEvent('Part', 'previousClick');
        this.handleStepUpdate(this.props, stepIndex - 1);
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.handleStepInit(this.props);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        this.handleStepInit(nextProps, this.props);
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        // when we want to go back, we need actually
        // to force one time a refresh to reload all the helpers
        // in the same group
        var _props = this.props,
            isPrevious = _props.isPrevious,
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
        return _react2.default.createElement(WrappedComponent, _extends({}, this.props, this.state, {
          handleStepReset: this.handleStepReset,
          onNextClick: this.onNextClick,
          onPreviousClick: this.onPreviousClick }));
      }
    }]);

    return _Part;
  }(_react.Component);

  function mapStateToProps(state, ownProps) {
    var _state$router = state.router,
        pathname = _state$router.location.pathname,
        search = _state$router.search,
        trackEvent = state.tracking.trackEvent;

    var visibleHelpers = getVisibleHelpers({ state: state, ownProps: ownProps });
    return { pathname: pathname,
      search: search,
      stepIndex: parseInt(search.helperIndex),
      trackEvent: trackEvent,
      visibleHelpers: visibleHelpers
    };
  }
  return (0, _reactRedux.connect)(mapStateToProps, { push: _reactRouterRedux.push })(_Part);
};