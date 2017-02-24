import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import HgHero from '../';

describe('HgHero', () => {

  it('Renders a hero component', () => {
    let instance = TestUtils.renderIntoDocument(
      <HgHero />
    );
    expect(instance.constructor.displayName).toBe('HgHero');
    expect(findDOMNode(instance).nodeName).toBe('DIV');
    expect(findDOMNode(instance).id).toBe('hero');
  });

});
