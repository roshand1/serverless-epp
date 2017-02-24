import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import OfficeHours from '../OfficeHours';

describe('OfficeHours', () => {
  it('Renders an OfficeHours component', () => {
    let instance = TestUtils.renderIntoDocument(
      <OfficeHours
        officeHours={[1,2,3]} />
    );
    expect(instance.constructor.displayName).toBe('OfficeHours');
    expect(findDOMNode(instance).nodeName).toBe('DIV');
    expect(findDOMNode(instance).className).toBe('hg3-office-hours');
  });

  it('Will not render without data', () => {
    let instance = TestUtils.renderIntoDocument(
      <OfficeHours />
    );
    expect(instance.constructor.displayName).toBe('OfficeHours');
    expect(findDOMNode(instance).nodeName).toBe('DIV');
    expect(findDOMNode(instance).className).toBe('no-office-hours');
  });

  it('Will not render with an empty array', () => {
    let instance = TestUtils.renderIntoDocument(
      <OfficeHours
        officeHours={[]} />
    );
    expect(instance.constructor.displayName).toBe('OfficeHours');
    expect(findDOMNode(instance).nodeName).toBe('DIV');
    expect(findDOMNode(instance).className).toBe('no-office-hours');
  });
});
