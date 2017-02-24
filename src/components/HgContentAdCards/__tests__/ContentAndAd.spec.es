import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import ContentAndAd from '../ContentAndAd';

const testContent = {
  adPosition : 2,
  adType : null,
  contentIds:['1','2','3'],
  firstAdPlacement : false,
  tipAdvertisement : null
};

describe('ContentAndAd', () => {

  it('Renders a logo card', () => {
    let instance = TestUtils.renderIntoDocument(
      <ContentAndAd content={testContent} />
    );
    expect(instance.constructor.displayName).toBe('ContentAndAd');
    expect(findDOMNode(instance).nodeName).toBe('DIV');
    expect(findDOMNode(instance).className).toMatch(/\bhg3-section-intercept\b/);
  });

});
