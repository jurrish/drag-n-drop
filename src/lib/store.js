import {createStore, applyMiddleware} from 'redux';
import reporter from './redux-reporter.js';
import reducer from '../reducer';

//this style is for testing purposes
//every time this function is called it returns function that creates a unique store
export default () => createStore(reducer, applyMiddleware( reporter ))
