import React from 'react';
import {shallow} from 'enzyme';
import HeaderNav from '../HeaderNav';

describe('HeaderNav', () => {
  test('renders', () => {
    const wrapper = shallow(
      <HeaderNav />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
