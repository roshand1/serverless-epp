import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import HgSectionTitle from '../';

describe('HgSectionTitle', () => {

  it('Renders a section title component', () => {
    let instance = TestUtils.renderIntoDocument(
      <HgSectionTitle />
    );
    expect(instance.constructor.displayName).toBe('HgSectionTitle');
    expect(findDOMNode(instance).nodeName).toBe('DIV');
    expect(findDOMNode(instance).className).toMatch(/\bhg3-section-header\b/);
  });

});
