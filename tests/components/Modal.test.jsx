import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../../src/components/Modal';

describe('<Modal />', () => {
  test('it exists', () => {
    expect(Modal).toBeTruthy();
  });

  test('it renders divs', () => {
    const wrapper = shallow(<Modal />);
    expect(wrapper.find('div').length).toBeTruthy();
  });

  test('it renders the title correctly', () => {
    const wrapper = shallow(<Modal title="title" />);
    expect(wrapper.find('.modal-title').text()).toEqual('title');
  });

  test('it renders children correctly', () => {
    const wrapper = shallow(<Modal><h1>TestHeader</h1></Modal>);
    expect(wrapper.find('h1').text()).toEqual('TestHeader');
  });
});
