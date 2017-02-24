import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import HgOfficeLocation from '../';

describe('HgOfficeLocation', () => {

  it('Renders an office location component', () => {
    let instance = TestUtils.renderIntoDocument(
      <HgOfficeLocation
        mapOpts={{ id: 'test-map' }}/>
    );
    expect(instance.constructor.displayName).toBe('HgOfficeLocation');
    expect(findDOMNode(instance).nodeName).toBe('DIV');
    expect(findDOMNode(instance).className).toBe('office-location-wrap');
  });

});
