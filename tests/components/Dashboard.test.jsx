import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from '../../src/components/Dashboard';
import Modal from '../../src/components/Modal';
import About from '../../src/components/About';

describe('<Dashboard />', () => {
  test('it exists', () => {
    expect(Dashboard).toBeTruthy();
  });

  test('it renders correctly', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.find('div').length).toBeTruthy();
  });

  test('it renders the about content in a modal', () => {
    const wrapper = shallow(<Dashboard />);
    wrapper.instance().openAbout();
    expect(wrapper.find(Modal).length).toBeTruthy();
    expect(wrapper.find(About).length).toBeTruthy();
  });
});
