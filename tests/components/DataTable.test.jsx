import React from 'react';
import { shallow } from 'enzyme';
import DataTable from '../../src/components/DataTable';

describe('<DataTable />', () => {
  test('it exists', () => {
    expect(DataTable).toBeTruthy();
  });

  test('it does not break given no data', () => {
    const wrapper = shallow(<DataTable />);
    expect(wrapper.find('div')).toHaveLength(0);
    expect(wrapper.find('thead')).toHaveLength(0);
  });

  test('it renders an empty table with no data', () => {
    const data = { };
    const wrapper = shallow(<DataTable data={data} />);
    expect(wrapper.find('div').length).toBeTruthy();
    expect(wrapper.find('thead')).toHaveLength(1);
  });

  test('it renders three rows correctly', () => {
    const data = { x: [1, 2, 3], y: [1, 2, 3] };
    const wrapper = shallow(<DataTable data={data} />);
    expect(wrapper.find('tr')).toHaveLength(4);
  });
});
