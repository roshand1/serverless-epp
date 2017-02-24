import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import HgLeaflet from '../';

describe('HgLeaflet', () => {

  it('Renders a map component', () => {
    let instance = TestUtils.renderIntoDocument(
      <HgLeaflet />
    );
    expect(instance.constructor.displayName).toBe('HgLeaflet');
    expect(findDOMNode(instance).nodeName).toBe('DIV');
    expect(findDOMNode(instance).id).toBe('map-container');
  });

});
