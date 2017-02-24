import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import HorizontalScrollCarousel from '../';

describe('HorizontalCarousel', () => {

  it('Renders a horizontal scroll carousel component', () => {
    let instance = TestUtils.renderIntoDocument(
      <HorizontalScrollCarousel>
        <div />
      </HorizontalScrollCarousel>
    );
    expect(instance.constructor.displayName).toBe('HorizontalScrollCarousel');
    expect(findDOMNode(instance).nodeName).toBe('DIV');
    expect(findDOMNode(instance).className).toMatch(/\bhg-horizontal-carousel\b/);
  });

  it('Will not render a horizontal scroll carousel component without props', () => {
    let instance = TestUtils.renderIntoDocument(
      <HorizontalScrollCarousel />
    );
    expect(instance.constructor.displayName).toBe('HorizontalScrollCarousel');
    expect(findDOMNode(instance)).toBeNull();
  });

});
