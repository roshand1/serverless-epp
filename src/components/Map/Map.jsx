import './_map.less';
import React, { PropTypes } from 'react';
import classNames from 'classnames';

// Have to defer the loading of the map/leaflet library
/*eslint-disable */
if (!process.IS_SERVER_SIDE) {
  var Leaflet = require('leaflet');
  var { Map, Marker, Popup, TileLayer } = require( 'react-leaflet');
}
/*eslint-enable */

const HgMap = React.createClass({

  propTypes: {
    containerClass: PropTypes.string,
    containerId: PropTypes.string.isRequired,
    detectRetina: PropTypes.bool,
    dragging: PropTypes.bool,
    doubleClickZoom: PropTypes.bool,
    iconLabel: PropTypes.string,
    iconSize: PropTypes.oneOf(['small', 'large']),
    locations: PropTypes.arrayOf(PropTypes.shape({
      city: PropTypes.string,
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      name: PropTypes.string,
      postalCode: PropTypes.string,
      state: PropTypes.string,
      street: PropTypes.string
    })).isRequired,
    markerOpacity: PropTypes.number,
    maxZoom: PropTypes.number,
    minZoom: PropTypes.number,
    scrollWheelZoom: PropTypes.bool,
    touchZoom: PropTypes.bool,
    zoom: PropTypes.number
  },

  getDefaultProps () {
    return {
      detectRetina: true,
      dragging: true,
      doubleClickZoom: false,
      iconLabel: '',
      iconSize: 'large',
      maxZoom: 20,
      markerOpacity: 1.0,
      minZoom: 6,
      scrollWheelZoom: false,
      touchZoom: true,
      zoom: 15
    };
  },

  getInitialState () {
    return {
      showMap: false
    };
  },

  componentDidMount () {
    this.manageShowMap();
  },

  componentWillUpdate () {
    //This fixes the wacky tobacky bug in react-leaflet where if you a) click on a popup marker, b) leave the popup open, then c) click on something that re-renders the map, then
    //you MAY (not always) get the dreaded Gray Map.  This cannot be managed via state, so instead, prior to render(), if the popup is open, manually fire the event 
    //that will close it, and the error magically goes away.
    const popupCloseBtn = document.querySelector('.leaflet-popup-close-button');
    if (popupCloseBtn && popupCloseBtn.click) popupCloseBtn.click();
  },

  manageShowMap () {
    this.setState({ showMap: true });
  },

  getBounds () {
    const locations = this.props.locations;
    if (locations.length < 2) return undefined;

    //Return a rectangle representing the SW corner and the NW corner, e.g. [[lat.min, lng.min],[lat.max, lng.max]]
    const lats = locations.map((loc) => loc.latitude);
    const lngs = locations.map((loc) => loc.longitude);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    return [[minLat,minLng],[maxLat,maxLng]];
  },

  getCenter () {
    const locations = this.props.locations;
    return locations.length === 1 ? [locations[0].latitude,locations[0].longitude] : undefined;
  },

  getMarkers (location, index) {
    const LabelIcon = Leaflet.Icon.extend({
      options: {
        iconUrl: 'data:image/png;base64,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',
        label: '',
        shadowUrl: null,
        iconSize: new Leaflet.Point(25, 35),
        popupAnchor: new Leaflet.Point(-1, -16),
        className: 'leaflet-labeled-marker-div-icon'
      },
      createIcon: function () {
        let icon = document.createElement('div');
        let img = this._createImg(this.options['iconUrl']);
        let labelDiv = document.createElement('div');

        labelDiv.setAttribute('class', 'label');
        labelDiv.innerHTML = this.options['label'] || '';
        icon.appendChild(img);
        icon.appendChild(labelDiv);
        this._setIconStyles(icon, 'icon');
        return icon;
      }
    });

    let labelText = '';
    if (this.props.iconSize === 'large') {
      if (this.props.iconLabel) {
        labelText = location.label;
      }
      else if (this.props.locations.length > 1) {
        labelText = location.label;
      }
    }
    
    const leafletIcon = new LabelIcon({ label: labelText });
    const showLocationPopup = location.name && location.street && location.city && location.state && location.postalCode;

    return (
      <Marker
        className="small"
        icon={leafletIcon}
        key={`map-marker-${location.label}`}
        opacity={this.props.markerOpacity}
        position={[location.latitude, location.longitude]}>
        {showLocationPopup && 
          <Popup>
            <div style={{ textAlign: 'center', padding: '0 15px' }}>
              {location.name}<br/>
              {location.street}<br/>
              {`${location.city}, ${location.state}  ${location.postalCode}`}
            </div>
          </Popup>
        }
      </Marker>
    );
  },

  render () {
    if (!this.state.showMap || !Leaflet || !Leaflet.Icon || !this.props.locations || !this.props.locations.length) return null;
    
    const classList = {
      [this.props.containerClass]: !!this.props.containerClass,
      'no-zooming': !this.props.touchZoom,
      'no-dragging': !this.props.dragging,
      'small-icon': this.props.iconSize === 'small'
    };

    return (
      <div className={classNames(classList)}>
        <Map
          bounds={this.getBounds()}
          center={this.getCenter()}         
          detectRetina={this.props.detectRetina}
          doubleClickZoom={this.props.doubleClickZoom}
          dragging={this.props.dragging}
          id={this.props.containerId}
          maxZoom={this.props.maxZoom}
          minZoom={this.props.minZoom}
          scrollWheelZoom={this.props.scrollWheelZoom}
          touchZoom={this.props.touchZoom}
          zoom={this.props.zoom}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='http://d2pc1kq2twy0v1.cloudfront.net/osm/{z}/{x}/{y}.png' />
            {this.props.locations.map((location, index) => this.getMarkers(location, index))}
        </Map>
      </div>
    );
  }
});

export default HgMap;


