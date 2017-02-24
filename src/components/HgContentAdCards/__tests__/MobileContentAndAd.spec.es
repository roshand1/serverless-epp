import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import MobileContentAndAd from '../MobileContentAndAd';

const testContent = {
  adPosition : 2,
  adType : null,
  contentIds:['1','2','3'],
  firstAdPlacement : false,
  tipAdvertisement : null
};

describe('MobileContentAndAd', () => {

  it('Renders a ad and content component for mobile', () => {
    let instance = TestUtils.renderIntoDocument(
      <MobileContentAndAd content={testContent} />
    );
    expect(instance.constructor.displayName).toBe('MobileContentAndAd');
    expect(findDOMNode(instance).nodeName).toBe('DIV');
    expect(findDOMNode(instance).className).toBe('hg3-mobile-content-and-ad');
  });

});
