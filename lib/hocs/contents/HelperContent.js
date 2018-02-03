'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HelperContent = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactDom = require('react-dom');

var _transactionsInterfaceState = require('transactions-interface-state');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HelperContent = exports.HelperContent = function HelperContent(WrappedComponent) {
  var _HelperContent = function (_Component) {
    _inherits(_HelperContent, _Component);

    function _HelperContent() {
      _classCallCheck(this, _HelperContent);

      var _this = _possibleConstructorReturn(this, (_HelperContent.__proto__ || Object.getPrototypeOf(_HelperContent)).call(this));

      _this.state = { hasScrolled: false,
        parentElement: null
      };
      _this.getHelperElement = _this._getHelperElement.bind(_this);
      _this.getParentElement = _this._getParentElement.bind(_this);
      _this.setHelperElement = _this._setHelperElement.bind(_this);
      return _this;
    }

    _createClass(_HelperContent, [{
      key: '_getParentElement',
      value: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var _this2 = this;

          var parent, parentElement;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  // maybe the element was not there yet
                  // so we set an interval for searching it
                  parent = this.props.parent;
                  _context.t0 = document.querySelector(parent);

                  if (_context.t0) {
                    _context.next = 6;
                    break;
                  }

                  _context.next = 5;
                  return new Promise(function (resolve, reject) {
                    _this2.findParentElementInterval = setInterval(function () {
                      var parentElement = document.querySelector(parent);
                      if (parentElement) {
                        clearInterval(_this2.findParentElementInterval);
                        resolve(parentElement);
                      }
                    }, 100);
                  });

                case 5:
                  _context.t0 = _context.sent;

                case 6:
                  parentElement = _context.t0;
                  return _context.abrupt('return', parentElement);

                case 8:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function _getParentElement() {
          return _ref.apply(this, arguments);
        }

        return _getParentElement;
      }()
    }, {
      key: '_getHelperElement',
      value: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var _this3 = this;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.t0 = this.helperElement;

                  if (_context2.t0) {
                    _context2.next = 5;
                    break;
                  }

                  _context2.next = 4;
                  return new Promise(function (resolve, reject) {
                    _this3.findHelperElementInterval = setInterval(function () {
                      if (_this3.helperElement) {
                        clearInterval(_this3.findHelperElementInterval);
                        resolve(_this3.helperElement);
                      }
                    }, 100);
                  });

                case 4:
                  _context2.t0 = _context2.sent;

                case 5:
                  return _context2.abrupt('return', _context2.t0);

                case 6:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function _getHelperElement() {
          return _ref2.apply(this, arguments);
        }

        return _getHelperElement;
      }()
    }, {
      key: 'componentDidMount',
      value: function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          var parentElement;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return this.getParentElement();

                case 2:
                  parentElement = _context3.sent;

                  /*
                  if (this.helperElement.parentElement) {
                    const helperParentElement = findDOMNode(this.helperElement.parentElement)
                    console.log('OUAI', helperParentElement, this.helperElement.parentElement, parentElement.offsetHeight)
                    helperParentElement.style.top = '500px'
                  }
                  */
                  this.setState({ parentElement: parentElement });

                case 4:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function componentDidMount() {
          return _ref3.apply(this, arguments);
        }

        return componentDidMount;
      }()
    }, {
      key: 'componentDidUpdate',
      value: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(prevProps) {
          var _this4 = this;

          var _props, active, isFirefox, position, stepIndex, hasScrolled, parentElement;

          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  // unpack
                  _props = this.props, active = _props.active, isFirefox = _props.isFirefox, position = _props.position, stepIndex = _props.stepIndex;
                  hasScrolled = this.state.hasScrolled;
                  parentElement = this.state.parentElement;
                  // check that parent has changed or not

                  if (!(this.props.parent !== prevProps.parent)) {
                    _context4.next = 8;
                    break;
                  }

                  _context4.next = 6;
                  return this.getParentElement();

                case 6:
                  parentElement = _context4.sent;

                  this.setState({ parentElement: parentElement });

                case 8:
                  // check for scrolling
                  if (parentElement && !hasScrolled && active && stepIndex !== 0) {
                    this.setState({ hasScrolled: true });
                    this.getHelperElement().then(function (helperElement) {
                      // as this is an absolute positioned
                      // element, it will not work in Firefox
                      var scrollElement = isFirefox ? parentElement : _this4.helperElement;
                      scrollElement.scrollIntoView({
                        behavior: 'smooth',
                        block: position === 'top' ? 'end' : 'start'
                      });
                    });
                  }

                case 9:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function componentDidUpdate(_x) {
          return _ref4.apply(this, arguments);
        }

        return componentDidUpdate;
      }()
    }, {
      key: '_setHelperElement',
      value: function _setHelperElement(_e) {
        this.helperElement = _e;
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.findHelperElementInterval) {
          clearInterval(this.findHelperElementInterval);
        }
        if (this.findParentElementInterval) {
          clearInterval(this.findParentElementInterval);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(WrappedComponent, _extends({}, this.props, this.state, {
          setHelperElement: this.setHelperElement,
          handleStepReset: this.handleStepReset }));
      }
    }]);

    return _HelperContent;
  }(_react.Component);

  return (0, _reactRedux.connect)(function (state, _ref5) {
    var contentName = _ref5.contentName;
    return {
      ContentComponent: (0, _transactionsInterfaceState.getViewerComponent)(state, 'content', contentName || 'boxes')
    };
  })(_HelperContent);
};