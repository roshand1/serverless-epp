import './_map-panel.less';
import React, { PropTypes } from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

const MapPanel = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    availability: PropTypes.array,
    isiPad: PropTypes.bool,
    location: PropTypes.shape({
      city: PropTypes.string,
      directionsUrl: PropTypes.string,
      id: PropTypes.string,
      mainSiteUrl: PropTypes.string,
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      name: PropTypes.string,
      postalCode: PropTypes.string,
      state: PropTypes.string
    }).isRequired
  },

  render () {
    if (!this.props.location) return null;
    const { location } = this.props;

    return (
      <div className="hg3-map-information" id={`office-${location.id}`} >
        <address className="hg3-office-map-address">
          <a href={location.mainSiteUrl}>
          
              {location.name && <h3>{location.name}</h3> }
              <span>{location.street}</span>
              <span>{`${location.city}, ${location.state} ${location.postalCode}`}</span>
          
          </a>
        </address>
        {location.latitude !== 0.0 && location.longitude !== 0.0 &&
        <a
            href={this.props.isiPad ?
            `http://maps.apple.com${location.directionsUrl}` :
            `http://maps.google.com${location.directionsUrl}`
          }
          target="_blank"
          text="Get Directions">Get Directions &raquo;</a>
        }
      </div>
    );
  }
});

export default MapPanel;
