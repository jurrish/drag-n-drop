import categoryReducer from '../reducer/category.js'

describe('testing category reducer', () => {

  test('initial state should be an empty array', () => {
    let result = categoryReducer(undefined, {type: null})
    expect(result).toEqual([]);
  })

  test('if the action type isnt registered it will return the state', () => {
    let result = categoryReducer(0, { type: null})
    expect(result).toEqual(0);
  })

  test('CATEGORY_CREATE should append to the array', () => {
    let action = {
      type: 'CATEGORY_CREATE',
      payload: {
        id: '123',
        title: 'cool beans',
        timestamp: new Date(),
      },
    }

    let testState = categoryReducer([], action)

    expect(testState.length).toBe(1);
    expect(testState[0]).toBe(action.payload)

    let actionTwo = {
      type: 'CATEGORY_CREATE',
      payload: {
        id: '123',
        title: 'cool beans',
        timestamp: new Date(),
      },
    }

    testState = categoryReducer(testState, actionTwo)
    expect(testState.length).toBe(2);
    expect(testState[0]).toBe(action.payload)
    expect(testState[1]).toBe(actionTwo.payload)

  })

  test('CATEGORY_DELETE should delete an item from the state array', () => {
    let mockState =
    [
      { id: '1', title: 'cool', timestamp: new Date() },
      { id: '2', title: 'beans', timestamp: new Date() },
      { id: '3', title: 'bro', timestamp: new Date() },
      { id: '4', title: 'suff', timestamp: new Date() },
    ]

    let actionOne = {
      type: 'CATEGORY_DELETE',
      payload: mockState[1]
    }

    let state = categoryReducer(mockState, actionOne);

    expect(state.length).toBe(3);
    expect(state).toEqual(mockState.filter(item => item.id != '2'))

  })

  test('CATEGORY_UPDATE should update an existing item in the state array', () => {
    let mockState =
    [
      { id: '1', title: 'cool', timestamp: new Date() },
      { id: '2', title: 'beans', timestamp: new Date() },
      { id: '3', title: 'bro', timestamp: new Date() },
      { id: '4', title: 'suff', timestamp: new Date() },
    ]

    let actionOne = {
      type: 'CATEGORY_UPDATE',
      payload: { id: '3', title: 'hax', timestamp: new Date() }
    }

    let state = categoryReducer(mockState, actionOne)

    expect(state.length).toBe(4)
    expect(state).toEqual(mockState.map(item =>
    item.id == '3' ? actionOne.payload : item ))
  })

//validation testing
  test('CATEGORY_UPDATE should throw an error if id, title, or timestamp are missing', () => {
    let mockState =
    [
      { id: '1', title: 'cool', timestamp: new Date() },
    ]

    let actionOne = {
      type: 'CATEGORY_UPDATE',
      payload: { id: '3', timestamp: new Date() }
    }

    expect(() => categoryReducer(mockState, actionOne))
      .toThrow('VALIDATION ERROR: payload should have id, title, and timestamp')

  })

})
