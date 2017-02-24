import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import HgPracticeInfo from '../';

describe('HgPracticeInfo', () => {

  it('Renders a practice information section component', () => {
    let instance = TestUtils.renderIntoDocument(
      <HgPracticeInfo />
    );
    expect(instance.constructor.displayName).toBe('HgPracticeInfo');
    expect(findDOMNode(instance).nodeName).toBe('SECTION');
    expect(findDOMNode(instance).className).toMatch(/\bhg3-practice-information\b/);
  });

});
