import React from 'react';
import { shallow } from 'enzyme';
import SideMenu from '../../src/components/SideMenu';

describe('<Side Menu />', () => {
  test('it exists', () => {
    expect(SideMenu).toBeTruthy();
  });

  test('it renders divs', () => {
    const wrapper = shallow(<SideMenu />);
    expect(wrapper.find('div').length).toBeTruthy();
  });

  test('shows clear button if it has data', () => {
    const wrapper = shallow(<SideMenu hasData />);
    expect(wrapper.find('button').at(1).text()).toBe('Clear Data');
  });

  test('does not show clear button if it has no data', () => {
    const wrapper = shallow(<SideMenu />);
    expect(wrapper.find('button').at(1).text()).toBe('Generate');
  });
});
