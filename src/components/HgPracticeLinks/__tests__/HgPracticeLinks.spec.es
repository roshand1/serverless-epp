import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import HgPracticeLinks from '../';

describe('HgPracticeLinks', () => {

  it('Renders a pratice links component', () => {
    let instance = TestUtils.renderIntoDocument(
      <HgPracticeLinks />
    );
    expect(instance.constructor.displayName).toBe('HgPracticeLinks');
    expect(findDOMNode(instance).nodeName).toBe('DIV');
    expect(findDOMNode(instance).className).toBe('practice-link');
  });

});
