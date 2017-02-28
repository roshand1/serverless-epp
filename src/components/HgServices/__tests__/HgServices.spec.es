import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import HgServices from '../';
import procedures from './data';

describe('HgServices', () => {

  it('Renders a services section component', () => {
    let instance = TestUtils.renderIntoDocument(
      <HgServices
        services={procedures} />
    );
    expect(instance.constructor.displayName).toBe('HgServices');
    expect(findDOMNode(instance).nodeName).toBe('SECTION');
    expect(findDOMNode(instance).className).toMatch(/\bhg3-practice-services\b/);
  });

});
