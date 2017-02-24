import './_address-locator.less';
import React, { PropTypes } from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import classNames from 'classnames';
import Icon from '@hg/three-ui/HgIcon';

const AddressLocator = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    city: PropTypes.string.isRequired,
    clickable: PropTypes.bool,
    clickCallback: PropTypes.func,
    className: PropTypes.string,
    dataId: PropTypes.string,
    hgoName: PropTypes.string,
    id: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    locationName: PropTypes.string,
    postalCode: PropTypes.string.isRequired,
    showGetDirections:  PropTypes.bool,
    showMapMarker: PropTypes.bool,
    stateAbbrev: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    street2: PropTypes.string,
    tabName: PropTypes.string
  },

  getDefaultProps () {
    return {
      clickable: true,
      clickCallback: ()=>{},
      dataId: 'hospital-tabs',
      hgoName: 'address',
      locationName: '',
      showMapMarker: true,
      tabName: 'visitTab'
    };
  },

  isValidAddress () {
    // you must have these props to render a valid address
    const { city, postalCode, stateAbbrev, street } = this.props;
    return !!city && !!postalCode && !!stateAbbrev && !!street;
  },

  renderClickableStreet () {
    return (
      <p className="office-street1 top-line">
        {this.props.showMapMarker && <Icon icon="map-marker" />}{this.props.street} {this.props.clickable && <Icon icon="chevron-right" />}
      </p>
    );
  },

  keyDownCallback (e) {
    if (e.keyCode === 32) {
      this.props.clickCallback();
    }
  },

  render () {
    if (!this.isValidAddress()) { return null; }

    const classList = {
      'hg3-address-locator': true,
      'js-profile-scroll-link' : this.props.clickable,
      [this.props.className] : !!this.props.className,
      'show-map-marker': this.props.showMapMarker
    };
    const { clickable } = this.props;

    return (
      <div
        className={classNames(classList)}
        itemScope itemProp="location"
        itemType="http://schema.org/Place">
        {!!this.props.latitude && !!this.props.longitude &&
          <div itemProp="geo" itemScope itemType="http://schema.org/GeoCoordinates">
            <meta content={this.props.latitude} itemProp="latitude" />
            <meta content={this.props.longitude} itemProp="longitude" />
          </div>
        }
        <address
          aria-label="officeAddress"
          itemScope
          itemProp="address"
          itemType="http://schema.org/PostalAddress"
          data-hgoname={this.props.hgoName}
          data-tabname={clickable ? this.props.tabName : ''}
          data-id={clickable ? this.props.dataId : ''}
          id={this.props.id}
          onClick={this.props.clickCallback}
          onKeyDown={this.keyDownCallback}
          role={clickable ? 'button' : ''}
          tabIndex="1">

          {!this.props.showGetDirections && this.props.locationName !== '' &&
            <p data-qa-target="provider-practice-name" className="office-name top-line">
              {this.props.showMapMarker && <Icon icon="map-marker" />}{this.props.locationName} {clickable && <Icon icon="chevron-right" />}
            </p>
          }
          {this.props.locationName === '' ? this.renderClickableStreet() : <p itemProp="streetAddress" className="office-street1">{this.props.street}</p>}
          {this.props.street2 && <p className="office-street2">{this.props.street2}</p>}
          <p className="city-state-info">
            <span itemProp="addressLocality">{this.props.city}</span>, <span itemProp="addressRegion">{this.props.stateAbbrev}</span> <span itemProp="postalCode">{this.props.postalCode}</span>
          {this.props.showGetDirections &&
            <span 
              className="directions-scroller js-profile-scroll-link js-click-delay-until-load"
              data-tabname="visitTab"
              data-id="js-section-visit"><Icon icon="map-marker" /> Get Directions <Icon icon="chevron-right" /></span>
          }
          </p>
        </address>
      </div>
    );
  }
});

export default AddressLocator;
