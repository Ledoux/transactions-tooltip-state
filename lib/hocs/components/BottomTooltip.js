'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BottomTooltip = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPortalTooltip = require('react-portal-tooltip');

var _reactPortalTooltip2 = _interopRequireDefault(_reactPortalTooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BottomTooltip = exports.BottomTooltip = function (_Tooltip) {
  _inherits(BottomTooltip, _Tooltip);

  function BottomTooltip() {
    _classCallCheck(this, BottomTooltip);

    return _possibleConstructorReturn(this, (BottomTooltip.__proto__ || Object.getPrototypeOf(BottomTooltip)).apply(this, arguments));
  }

  return BottomTooltip;
}(_reactPortalTooltip2.default);