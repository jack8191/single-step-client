import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {shallow, mount} from 'enzyme';


import App from './App';

describe('<App />', () => {
  it('renders without crashing', () => {
    shallow(<Router><App /></Router>)
  });
  it('renders the navbar', () => {
    const wrapper = shallow(<App></App>)
    expect(wrapper.contains(<div className='nav-bar'/>))
  })
})
