import React from 'react';
import {Nav} from '../components';
import {outerHTML} from '../build/helpers';

describe('Nav component', () => {
  it(`renders with defaults`, () => {
    expect(
      outerHTML(
        <Nav/>
      )
    ).toMatchSnapshot();
  });
});
