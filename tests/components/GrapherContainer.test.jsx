import React from 'react';
import { shallow } from 'enzyme';
import GrapherContainer from '../../src/components/GrapherContainer';

describe('<GrapherContainer />', () => {
  test('it exists', () => {
    expect(GrapherContainer).toBeTruthy();
  });

  test('it renders a div', () => {
    const wrapper = shallow(<GrapherContainer />);
    expect(wrapper.find('div')).toHaveLength(1);
  });
});
