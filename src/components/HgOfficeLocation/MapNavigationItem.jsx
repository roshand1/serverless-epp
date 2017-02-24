import './_map-navigation-item.less';
import React, { PropTypes } from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import classNames from 'classnames';
import AddressLocator from '../AddressLocator';
import OfficeHours from '../OfficeHours';
import Coin from '@hg/three-ui/HgCoin';

import HgRenderMapWithPanel from './HgRenderMapWithPanel';

const MapNavigationItem = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    isiPad:PropTypes.bool,
    changeMapLocation: PropTypes.func,
    index: PropTypes.number,
    isActive: PropTypes.bool,
    location: PropTypes.shape({
      city: PropTypes.string,
      label: PropTypes.string,
      id: PropTypes.string,
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      name: PropTypes.string,
      postalCode: PropTypes.string,
      practiceName: PropTypes.string,
      state: PropTypes.string
    }).isRequired,
    mapContainerId: PropTypes.string
  },
   getInitialState () {
    return {
      renderSpecificLocation:{}
    };
  },

  renderSingleMap(){
    var locations = [];
         return <HgRenderMapWithPanel locations={[this.state.renderSpecificLocation]} isiPad={this.props.isiPad}></HgRenderMapWithPanel>
},

switchMap(){
this.props.changeMapLocation(this.props.location)
},

  render () { 
    if (!this.props.location) return null;

    const { location } = this.props;
    const classList = {
      'hg3-map-navigation-item': true,
      'active': this.props.isActive
    };
    const callbackVars = [
      this.props.mapContainerId,
      location,
      15,
      this.props.index,
    ];
   var addressStyle = {
      width: '50%'
    };
    var mapStyle ={
      float:'right'
    }
      const automationId = "selectedOfficeLocation"+this.props.location.label;
    return (
      <div data-id={automationId}
        className={classNames(classList)}
        id={`office-${location.id}`}
        onClick={this.switchMap}>
          <Coin>{location.label}</Coin>
          <AddressLocator
            city={location.city}
            clickable={false}
            locationName={location.practiceName}
            postalCode={location.postalCode}
            showMapMarker={false}
            stateAbbrev={location.state}
            street={location.street} />
      </div>
    );
  }
});

export default MapNavigationItem;
