'use strict'

//reducers define initial state, and any changes that can be made to it

//keep the reducer PURE - don't call impure functions (ie - Date.now() or Math.random())
let validatePayload = (payload) => {
  if(!payload.id || !payload.title || !payload.timestamp)
    throw new Error('VALIDATION ERROR: payload should have id, title, and timestamp');
}

let initialState = []
export default (state=initialState, action) => {
  //actions have a type and a payload
  //in this case, the reducer takes in
  //actions with type: 'CATEGORY_CREATE', 'CATEGORY_UPDATE', 'CATEGORY_DELETE'
  //here, we are ripping the payload and type off inside the reducer
  //and handling returns based on what type is passed in
  let {type, payload} = action

  //this acts as a router
  //switch on these types
  switch(type){

    case 'CATEGORY_CREATE':
    validatePayload(payload)
      return [...state, payload]

    case 'CATEGORY_UPDATE':
    validatePayload(payload)
      return state.map(category =>
        category.id == payload.id ? payload : category)

    case 'CATEGORY_DELETE':
    validatePayload(payload)
      return state.filter(category => category.id !== payload.id)

    case 'CATEGORY_RESET':
      return initialState

    default:
      return state
  }
}

//from here, we pass these actions into our dispatch in dashbard-container.
//const mapDispatchToProps = (dispatch, getState) => {
//   return {
//     categoryCreate: (category) => dispatch(categoryCreate(category)),
//     categoryUpdate: (category) => dispatch(categoryUpdate(category)),
//     categoryDelete: (category) => dispatch(categoryDelete(category)),
//   }
// }

//now our component can access and modify state through dispatching actions that take in whatever we want to modify.

//state = reducer(undefined, {type: null})

//state = reducer(state, {type: 'CATEGORY_CREATE', payload: {id: '123', title: 'cool'}})

//state = reducer(state, {type: 'CATEGORY_CREATE', payload: {id: 'abc', title: 'beans'}})

//state = reducer(state, {type: 'CATEGORY_UPDATE', payload: {id: '123', title: 'iwat'}})

//state = reducer(state, {type: 'CATEGORY_DELETE', payload: {id: '123', title: 'iwat'}})



//state = reducer(state, {type: 'CATEGORY_RESET'})
