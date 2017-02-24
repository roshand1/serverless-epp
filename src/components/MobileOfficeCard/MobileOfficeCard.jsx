import './_mobile-office-card.less';

import React, { PropTypes } from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import classNames from 'classnames';
import AddressLocator from '@hg/profile-ui/src/components/AddressLocator';
import Button from '@hg/three-ui/HgButton';
import Map from '@hg/profile-ui/src/components/Map';
import OfficeHours from '@hg/profile-ui/src/components/OfficeHours';

const MobileOfficeCard = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    city: PropTypes.string,
    className: PropTypes.string,
    directionsButtonId: PropTypes.string,
    directionsUrl: PropTypes.string,
    disableMap: PropTypes.bool,
    id: PropTypes.string,
    isDesignated: PropTypes.bool,
    isMarketTargeted: PropTypes.bool,
    isEpp: PropTypes.bool,
    isiPad: PropTypes.bool,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    mainSiteUrl: PropTypes.string,
    name: PropTypes.string,
    officeHours: PropTypes.array,
    postalCode: PropTypes.string,
    state: PropTypes.string,
    street: PropTypes.string
  },

  getDefaultProps () {
    return {
      disableMap: false,
      latitude: 0.0,
      longitude: 0.0,
    };
  },

  getInitialState () {
    return {
      //showPostCallAd: false
    };
  },

  render () {
    return (
      <article className='hg3-mobile-office-card' id={this.props.id}>
        {!this.props.disableMap && this.props.latitude !== 0.0 && this.props.longitude !== 0.0 &&
        <Map
          containerClass="hg3-map-container"
          containerId={`hg3m-office-map-container-${this.props.id}`}
          dragging={false}
          iconSize="small"
          touchZoom={false}
          position={[
            this.props.latitude,
            this.props.longitude
          ]} />
        }
        <div className="content-wrapper">
          <AddressLocator
            city={this.props.city}
            clickable={false}
            locationName={this.props.name}
            postalCode={this.props.postalCode}
            showMapMarker={false}
            stateAbbrev={this.props.state}
            street={this.props.street} />

            {Array.isArray(this.props.officeHours) && this.props.officeHours.length > 0 &&
          <OfficeHours
            id={this.props.id}
            officeHours={this.props.officeHours} />
          }

        <a className="mobile-directions" href={this.props.isiPad ?
            `http://maps.apple.com${location.directionsUrl}` :
            `http://maps.google.com${location.directionsUrl}`
          }
          target="_blank">Get Directions</a>
        
        </div>
      </article>
    );
  }
});

export default MobileOfficeCard;
