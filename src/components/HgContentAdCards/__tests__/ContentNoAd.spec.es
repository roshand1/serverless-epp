import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import ContentNoAd from '../ContentNoAd';

const testContent = {
  adPosition : 2,
  adType : null,
  contentIds:['1','2','3'],
  firstAdPlacement : false,
  tipAdvertisement : null
};

describe('ContentNoAd', () => {

  it('Renders a content component without ad', () => {
    let instance = TestUtils.renderIntoDocument(
      <ContentNoAd content={testContent} />
    );
    expect(instance.constructor.displayName).toBe('ContentNoAd');
    expect(findDOMNode(instance).nodeName).toBe('DIV');
    expect(findDOMNode(instance).className).toMatch(/\bhg3-section-intercept\b/);
  });

});
