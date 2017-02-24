import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import HgLogo from '../';

describe('HgLogo', () => {

  it('Renders an logo component', () => {
    let instance = TestUtils.renderIntoDocument(
      <HgLogo imgSrc="/assets/images/lodo-logo.png" />
    );
    expect(instance.constructor.displayName).toBe('HgLogo');
    expect(findDOMNode(instance).nodeName).toBe('DIV');
    expect(findDOMNode(instance).className).toBe('hg3-practice-logo');
  });

});
