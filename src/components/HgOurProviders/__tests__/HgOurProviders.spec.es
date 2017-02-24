import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import HgOurProviders from '../';
import providers from './data';

describe('HgOurProviders', () => {

  it('Renders a providers section component', () => {
    let instance = TestUtils.renderIntoDocument(
      <HgOurProviders
        providerArr={providers}
        providerCount={36}/>
    );
    expect(instance.constructor.displayName).toBe('HgOurProviders');
    expect(findDOMNode(instance).nodeName).toBe('SECTION');
    expect(findDOMNode(instance).className).toBe('hg3-practice-providers');
  });

});
