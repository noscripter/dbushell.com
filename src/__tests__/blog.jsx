import React from 'react';
import {Blog} from '../components';
import {outerHTML} from '../build/helpers';

describe('Blog component', () => {
  it(`renders with defaults`, () => {
    expect(
      outerHTML(
        <Blog/>
      )
    ).toMatchSnapshot();
  });
});
