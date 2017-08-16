import React from 'react';
//just a component from react-redux
//Provider wraps around our entire application
//Provider saves our store inside it

// NOTE:  Provider's job is to register, and keep track of the store so that later on, we can connect the store to our components through bindings.
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import createAppStore from '../../lib/store.js';
import DashboardContainer from '../dashboard-container';

import '../../../src/style/_main.scss';

const store = createAppStore();

class App extends React.Component {

  // componentDidMount () {
  //   store.subscribe(() => {
  //     console.log('__STATE__', store.getState())
  //   })
  //
  //   store.dispatch({type: null});
  // }

  render () {
    return (
      <div>
        <Provider store={ store } >
          <BrowserRouter>
            <Route exact path='/' component={ DashboardContainer } />
          </BrowserRouter>
        </Provider >
      </div>
    )
  }
}

export default App;
