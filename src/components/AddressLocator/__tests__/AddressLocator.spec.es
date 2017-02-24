import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import AddressLocator from '../';

describe('AddressLocator', () => {

  it('Renders an address locator component', () => {
    let instance = TestUtils.renderIntoDocument(
      <AddressLocator
        clickable
        city="Denver"
        id="X12345"
        locationName="Mayo Clinic"
        postalCode="80210"
        stateAbbrev="CO"
        street="123 Main St." />
    );
    expect(instance.constructor.displayName).toBe('AddressLocator');
    expect(findDOMNode(instance).nodeName).toBe('DIV');
    expect(findDOMNode(instance).className).toMatch(/\bhg3-address-locator\b/);
  });

  it('Will not render address locator component without full address', () => {
    let instance = TestUtils.renderIntoDocument(
      <AddressLocator />
    );
    expect(instance.constructor.displayName).toBe('AddressLocator');
    expect(findDOMNode(instance)).toBeNull();
  });

  it('Can be a clickable button with props `clickable` equal to true', () => {
    let onClickFunc = {};
    onClickFunc.method = () => true;
    spyOn(onClickFunc, 'method');

    let instance = TestUtils.renderIntoDocument(
      <AddressLocator
        clickable
        clickCallback={onClickFunc.method}
        city="Denver"
        id="X12345"
        locationName="Mayo Clinic"
        postalCode="80210"
        stateAbbrev="CO"
        street="123 Main St." />
    );
    let renderedComponent = findDOMNode(instance);
    let componentAddressNode = renderedComponent.getElementsByTagName('address')[0];

    expect(renderedComponent.className).toMatch(/\bjs-profile-scroll-link\b/);
    expect(componentAddressNode.dataset.id).toBe('hospital-tabs');
    expect(componentAddressNode.dataset.tabname).toBe('visitTab');
    expect(componentAddressNode.getAttribute('role')).toBe('button');
    expect(typeof instance.props.clickCallback).toBe('function');

    let topLine = TestUtils.findRenderedDOMComponentWithClass(instance, 'top-line');
    expect(topLine.getElementsByClassName('hg3-i-chevron-right').length).toEqual(1);

    TestUtils.Simulate.click(componentAddressNode);
    expect(onClickFunc.method).toHaveBeenCalled();
  });

  it('Will show street as first line if no display name given', () => {
    let instance = TestUtils.renderIntoDocument(
      <AddressLocator
        city="Denver"
        id="X12345"
        postalCode="80210"
        stateAbbrev="CO"
        street="123 Main St." />
    );
    let renderedComponent = TestUtils.findRenderedDOMComponentWithClass(instance, 'office-street1');
    expect(renderedComponent.classList.contains('top-line')).toBe(true);
  });

  it('Will show street as clickable if no display name given and props `clickable` added', () => {
    let instance = TestUtils.renderIntoDocument(
      <AddressLocator
        city="Denver"
        id="X12345"
        postalCode="80210"
        showMapMarker={false}
        stateAbbrev="CO"
        street="123 Main St." />
    );
    let renderedComponent = TestUtils.findRenderedDOMComponentWithClass(instance, 'top-line');
    expect(renderedComponent.getElementsByClassName('hg3-i-chevron-right').length).toEqual(1);
  });

  it('Suppress map-marker if props `showMapMarker` is equal to false', () => {
    let instance = TestUtils.renderIntoDocument(
      <AddressLocator
        city="Denver"
        id="X12345"
        postalCode="80210"
        showMapMarker={false}
        stateAbbrev="CO"
        street="123 Main St." />
    );
    let renderedComponent = TestUtils.findRenderedDOMComponentWithClass(instance, 'top-line');
    expect(renderedComponent.getElementsByClassName('hg3-i-map-marker').length).toEqual(0);
  });
});
