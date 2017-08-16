import React from 'react';
import { shallow } from 'enzyme';

import DashboardContainer from './index.js'
import createAppStore from '../../lib/store.js'

//create an appstore that is the same as when the app is first created.
describe('dashboard-container', () => {
  test('it should have a category props', () => {
    let mockStore = createAppStore()
    let wrapper = shallow( <DashboardContainer store={mockStore} /> );

    // console.log('state', mockStore.getState())
    expect(wrapper.props().categories).toEqual([])
  })

  test('it should be able to create categories', () => {
    let mockStore = createAppStore()
    let wrapper = shallow( <DashboardContainer store={mockStore} /> );

// checking for access to the store.
    let verify = wrapper.props().categoryCreate({title: 'cool'})
    console.log('HERE =========', verify.payload.title);
    expect(verify.payload.title).toEqual('cool');
  })
})
