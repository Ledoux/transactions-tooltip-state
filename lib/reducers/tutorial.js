"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTutorial = createTutorial;
function createTutorial(help) {
  var tutorial = function tutorial() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : help;
    var action = arguments[1];

    return state;
  };
  return tutorial;
}