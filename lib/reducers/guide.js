"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGuide = createGuide;
exports.getGuideTutorial = getGuideTutorial;
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

function getGuideTutorial(state, name) {
  return state.guide.tutorialsByName[name];
}