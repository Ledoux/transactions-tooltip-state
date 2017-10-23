"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGuide = createGuide;
function createGuide(tutorials) {
  var guide = function guide() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : tutorials;
    var action = arguments[1];

    return state;
  };
  return guide;
}