"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGuide = createGuide;
function createGuide(tutorials) {
  var initialState = { tutorialsByName: {} };
  tutorials.forEach(function (tutorial) {
    initialState.tutorialsByName[tutorial.name] = tutorial;
  });
  var guide = function guide() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    return state;
  };
  return guide;
}

var getPartTutorial = exports.getPartTutorial = function getPartTutorial(_ref, parts) {
  var search = _ref.router.search;
  return search.partIndex && parts && parts[parseInt(search.partIndex)];
};