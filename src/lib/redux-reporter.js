import { log, logError } from './util.js';
//reporter is a type of middleware

//if crash, report errors
//reporter takes in 3 functions as arguments that are curried and composible
// let reporter (store, next, action) => {
//
// }

//curried version
let reporter = store => next => action => {
  log('__ACTION__', action)

  //run through this function before it gets to the original dispatch before store gets updated
  try {
    //next is the dispatch middleware and will update state
    let result = next( action );
    //at this point, state is already updated because next is called.
    log('__STATE__', store.getState())
    return result;
  } catch( error ) {
    error.action = action;
    logError('__ERROR__', error)
    return error;
  }
}
export default reporter;
