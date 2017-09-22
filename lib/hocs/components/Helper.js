'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Helper = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Helper = exports.Helper = function Helper(WrappedComponent) {
  var _Helper = function (_Component) {
    _inherits(_Helper, _Component);

    function _Helper() {
      _classCallCheck(this, _Helper);

      var _this = _possibleConstructorReturn(this, (_Helper.__proto__ || Object.getPrototypeOf(_Helper)).call(this));

      _this.state = { hasScrolled: false,
        parentElement: null
      };
      _this.getHelperElement = _this._getHelperElement.bind(_this);
      _this.getParentElement = _this._getParentElement.bind(_this);
      return _this;
    }

    _createClass(_Helper, [{
      key: '_getParentElement',
      value: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var _this2 = this;

          var parent;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  // maybe the element was not there yet
                  // so we set an interval for searching it
                  parent = this.props.parent;
                  return _context.abrupt('return', document.querySelector(parent) || new Promise(function (resolve, reject) {
                    _this2.findParentElementInterval = setInterval(function () {
                      var parentElement = document.querySelector(parent);
                      if (parentElement) {
                        clearInterval(_this2.findParentElementInterval);
                        resolve(parentElement);
                      }
                    }, 100);
                  }));

                case 2:
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
                  return _context2.abrupt('return', this.helperElement || new Promise(function (resolve, reject) {
                    _this3.findHelperElementInterval = setInterval(function () {
                      if (_this3.helperElement) {
                        clearInterval(_this3.findHelperElementInterval);
                        resolve(_this3.helperElement);
                      }
                    }, 100);
                  }));

                case 1:
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
      value: function componentDidMount() {
        var _this4 = this;

        if (this.props.isVisible) {
          this.getParentElement().then(function (parentElement) {
            _this4.setState({ parentElement: parentElement });
          });
        }
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        var _this5 = this;

        var _props = this.props,
            active = _props.active,
            isFirefox = _props.isFirefox,
            position = _props.position,
            stepIndex = _props.stepIndex;
        var _state = this.state,
            hasScrolled = _state.hasScrolled,
            parentElement = _state.parentElement;

        if (parentElement && !hasScrolled && active && stepIndex !== 0) {
          this.setState({ hasScrolled: true });
          this.getHelperElement().then(function (helperElement) {
            // as this is an absolute positioned
            // element, it will not work in Firefox
            var scrollElement = isFirefox ? parentElement : _this5.helperElement;
            scrollElement.scrollIntoView({
              behavior: 'smooth',
              block: position === 'top' ? 'end' : 'start'
            });
          });
        }
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
        return _react2.default.createElement(WrappedComponent, _extends({}, this.props, {
          state: this.state }));
      }
    }]);

    return _Helper;
  }(_react.Component);

  return _Helper;
};