import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import MobileOfficeCard from '../';

describe('MobileOfficeCard', () => {

  let testProps = {
    city: 'Denver',
    id: '1234',
    isEpp: false,
    fax: '303-555-5556',
    mainSiteUrl: 'http://www.google.com',
    newPatientPhone: '720-555-5558',
    name: 'Dr. Smith',
    open: false,
    phone: '303-555-5557',
    postalCode: '80202',
    state: 'CO',
    street: '123 Nowhere St.'
  };

  it('Renders a Mobile Office card', () => {
    let instance = TestUtils.renderIntoDocument(
      <MobileOfficeCard {...testProps} />
    );
    expect(instance.constructor.displayName).toBe('MobileOfficeCard');
    expect(findDOMNode(instance).nodeName).toBe('ARTICLE');
    expect(findDOMNode(instance).className).toMatch(/\bhg3-mobile-office-card\b/);
  });

});
