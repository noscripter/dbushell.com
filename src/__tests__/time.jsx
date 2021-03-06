import React from 'react';
import {Time} from '../components';
import {outerHTML} from '../build/helpers';

describe('Time component', () => {
  it(`renders correct date`, () => {
    expect(
      outerHTML(
        // 1987-05-21T13:37:42+00:00
        <Time date={548602662000}/>
      )
    ).toMatchSnapshot();
  });
});
