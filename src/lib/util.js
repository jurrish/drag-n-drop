//take in a truthy falsy value, and a component.
//if the test is true, return the component, otherwise
//return undefined.

//can use to hide things based on state
export const renderIf = (test, component) =>
  test ? component : undefined

  // classToggler takes in some object with key/values are.  whenever the keys are truthy, we can return a string.
export const classToggler = (config) =>
  Object.keys(config).filter(key => config[key]).join(' ')

// example
// classToggler({
//     'hide': true,
//     'drop-complete': true,
// })

//returns 'hide drop complete'

export const log = (...args) =>
  __DEBUG__ ? console.log(...args) : undefined

export const logError = (...args) =>
  __DEBUG__ ? console.error(...args) : undefined
