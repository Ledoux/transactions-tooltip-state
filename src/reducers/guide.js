export function createGuide (tutorials) {
  const initialState = { tutorialsByName: {} }
  tutorials.forEach(tutorial => {
    initialState.tutorialsByName[tutorial.name] = tutorial
  })
  const guide = function (state = initialState, action) {
    return state
  }
  return guide
}

export function getGuideTutorial (state, name) {
  return state.guide.tutorialsByName[name]
}
