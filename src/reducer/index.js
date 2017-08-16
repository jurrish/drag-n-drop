import { combineReducers } from 'redux';

import cardsReducer from './cards.js';
import categorysReducer from './category.js';

//returns a categoryReducer where the state of it is an object where cards is whatever cards reducer returns, and categorys is whatever categorysReducer returns
export default combineReducers({
  cards: cardsReducer,
  categorys: categorysReducer,
})
