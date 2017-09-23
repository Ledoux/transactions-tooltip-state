'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tutorial = undefined;

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

var Tutorial = exports.Tutorial = function Tutorial(WrappedComponent) {
  var _Tutorial = function (_Component) {
    _inherits(_Tutorial, _Component);

    function _Tutorial() {
      _classCallCheck(this, _Tutorial);

      var _this = _possibleConstructorReturn(this, (_Tutorial.__proto__ || Object.getPrototypeOf(_Tutorial)).call(this));

      _this.state = { isPrevious: false };
      _this.handleStepInit = _this._handleStepInit.bind(_this);
      _this.handleStepReset = _this._handleStepReset.bind(_this);
      _this.handleStepUpdate = _this._handleStepUpdate.bind(_this);
      _this.onNextClick = _this._onNextClick.bind(_this);
      _this.onPreviousClick = _this._onPreviousClick.bind(_this);
      return _this;
    }

    _createClass(_Tutorial, [{
      key: '_handleStepInit',
      value: function _handleStepInit(props) {
        var search = props.search,
            stepIndex = props.stepIndex;

        if (search.tutorialCollectionName && !stepIndex) {
          this.handleStepUpdate(props, 0);
        }
      }
    }, {
      key: '_handleStepUpdate',
      value: function _handleStepUpdate(props, helperStepIndex) {
        var push = props.push,
            search = props.search;

        var nextSearch = (0, _transactionsInterfaceState.getUpdatedSearchString)(search, {
          helperStepIndex: helperStepIndex
        });
        push({ search: nextSearch });
      }
    }, {
      key: '_handleStepReset',
      value: function _handleStepReset() {
        /*
        const { push,
          search
        } = this.props
        if (search.helperStepIndex) {
          delete search.helperStepIndex
        }
        push({ search: getUpdatedSearchString(search) })
        */
      }
    }, {
      key: '_onNextClick',
      value: function _onNextClick(stepIndex) {
        this.handleStepUpdate(this.props, stepIndex + 1);
      }
    }, {
      key: '_onPreviousClick',
      value: function _onPreviousClick(stepIndex) {
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
        this.handleStepInit(nextProps);
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        // when we want to go back, we need actually
        // to force one time a refresh to reload all the helpers
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
          state: this.state,
          handleStepReset: this.handleStepReset,
          onNextClick: this.onNextClick,
          onPreviousClick: this.onPreviousClick }));
      }
    }]);

    return _Tutorial;
  }(_react.Component);

  function mapStateToProps(_ref) {
    var pathname = _ref.router.location.pathname,
        search = _ref.search,
        tutorial = _ref.tutorial;

    var helpers = search.tutorialCollectionName && tutorial[search.tutorialCollectionName];
    var stepIndex = search.helperStepIndex && parseInt(search.helperStepIndex);
    return { helpers: helpers,
      pathname: pathname,
      search: search,
      stepIndex: stepIndex
    };
  }
  return (0, _reactRedux.connect)(mapStateToProps, { push: _reactRouterRedux.push })(_Tutorial);
};