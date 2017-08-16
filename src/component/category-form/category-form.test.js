import React from 'react';
import { mount } from 'enzyme';
import CategoryForm from './index.js';

describe('testing CategoryForm', () => {
  test('onComplete should be invoked with the state onSubmit', () => {
    //create mockHandler through jest that keeps track of calls
    let mockHandleOnComplete = jest.fn();

    //mock.calls === [], it's empty. the first time we call that function, it passes in an ARRAY with arguments from what it's calling.
    //mock.calls[['hello'], ['cool']]

    //mount the component
    let wrapper = mount(
      <CategoryForm onComplete={mockHandleOnComplete} buttonText='submit' />
    )

    //create a mock state
    let mockState = { title: 'cool beans' }
    wrapper.setState(mockState)

    //submit the form
    wrapper.find('form').simulate('submit')

    //test that the state was passed to onComplete
    let { calls } = mockHandleOnComplete.mock
    //expect mockhandleoncomplete to be called once
    expect(calls.length).toBe(1)
    //with an instance of our mockState
    expect(calls[0][0]).toEqual(mockState)
  })

//NOTE: lol wat?

  test('testing onChange should update the title on the state', () => {

    let wrapper = mount(
      <CategoryForm onComplete={() => {}} buttonText='submit' />
    )

//could find name: 'title', type: 'checkbox', etc
    wrapper.find('input').simulate('change', {
      target: {
        value: 'cool'
      }
    })

    expect(wrapper.state('title')).toEqual('cool')

  })
})
