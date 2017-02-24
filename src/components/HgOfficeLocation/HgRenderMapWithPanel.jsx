import './_map-navigation-item.less';
import React, { PropTypes } from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import classNames from 'classnames';
import AddressLocator from '../AddressLocator';
import OfficeHours from '../OfficeHours';
import Coin from '@hg/three-ui/HgCoin';
import MapPanel from './MapPanel';
import Map from '../Map';
const mapContainerId = 'hg3-map-container';

const HgRenderMapWithPanel = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    isiPad:PropTypes.bool,
    locations:PropTypes.array
  },

  getZoomLevel() {
      return this.props.locations && this.props.locations.length===1?12:7;
  },

getContainerId(){
return this.props.locations && this.props.locations.length===1?'hg3-map-container'+this.props.locations[0].label:'hg3-map-container';
},

getLabel(){
return this.props.locations && this.props.locations.length===1?this.props.locations[0].label:null;
},
getOpacity(){
return this.props.locations && this.props.locations.length===1?null:0.5;
},

  render () {
       const automationId =this.props.locations && this.props.locations.length===1 ? "renderedOfficeMap1":"renderedOfficeMap" + this.props.locations.length;
      return <div className="hg3-office-map-display" data-id={automationId}>
                  <Map
                  containerClass="hg3-map-container"
                  containerId={this.getContainerId()}
                  dragging={false}
                  touchZoom={false}
                  zoom={this.getZoomLevel()}
                  markerOpacity={this.getOpacity()}
                  locations={this.props.locations}
                  iconLabel={this.getLabel()}/>
                  {this.props.locations[0] && <MapPanel isiPad={this.props.isiPad}
                                    location={this.props.locations[0]} />}
        </div>
  }
});

export default HgRenderMapWithPanel;
