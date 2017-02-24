import './_visiting-offices-map.less';

import React, { PropTypes } from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import Map from '../Map';

import MapNavigationItem from './MapNavigationItem';
import MapPanel from './MapPanel';
import HgPaginationComp from '../../../utils/serverSidePagination.jsx';
import HgRenderMapWithPanel from './HgRenderMapWithPanel';

const mapContainerId = 'hg3-map-container';

const VisitingOfficesMap = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    disableMap: PropTypes.bool,
    isDesignated: PropTypes.bool,
    isiPad : PropTypes.bool,
    isMobile: PropTypes.bool,
    officeLocations: PropTypes.array,
  },


  getDefaultProps () {
    return {
      disableMap: false
    };
  },

  getInitialState () {
    return {
      rerenderItem:false,
      currentLocationId: '',
      displayedLocationInMap:[],
      itemCountPerPage:4,
      currentPageNumber:1
    };
  },

componentDidMount: function(){
        this.renderInitialMapWithAllLocationInPage(1);
           
    },
pageChange: function(pageNumber){
    this.setState({currentPageNumber:pageNumber})
    this.setState({renderSpecificMap:false});
    this.setState({currentLocationId:''})
    this.renderInitialMapWithAllLocationInPage(pageNumber);
  },

  renderInitialMapWithAllLocationInPage(currentPage){
    var mapsToRender=[];
    var addressToPaginate=[];
    this.props.officeLocations.map((location,index)=>{
         // This is for leaflet
         mapsToRender.push(location);
        });
        mapsToRender.splice(((currentPage)*this.state.itemCountPerPage),this.props.officeLocations.length);
        mapsToRender.splice(0,((currentPage-1)*this.state.itemCountPerPage))
       this.setState({displayedLocationInMap:mapsToRender})
  },
renderLocationDescription(){
  var currentPage = this.state.currentPageNumber;
   var addressToPaginate=[];
    this.props.officeLocations.map((location,index)=>{
      // This is for pagination
        addressToPaginate.push(
             <div key={location.id}>
              <MapNavigationItem
                isiPad={this.props.isiPad}
                changeMapLocation={this.changeMapLocation}
                isActive={location.id == this.state.currentLocationId}
                location={location}
                key={`officeLocation-${location.id}`}
                index={index}
                mapContainerId={mapContainerId} />
             </div>)
          });
    addressToPaginate.splice(((currentPage)*this.state.itemCountPerPage),this.props.officeLocations.length);
    addressToPaginate.splice(0,((currentPage-1)*this.state.itemCountPerPage))
  return addressToPaginate;
},
  renderPagination(){
      var paginationdiv ={
      flex:1
    }
    var paginationList = this.renderLocationDescription();
      return <div id="hospital-tabs" role="navigation" style={paginationdiv}>
                     <HgPaginationComp totalItemCount={this.props.officeLocations.length} 
                      itemCountPerPage={this.state.itemCountPerPage}
                      onClick={this.pageChange}
                      displayList={paginationList}
                      rerenderItem = {this.state.rerenderItem}>
                     </HgPaginationComp>
                  </div>
        },


renderAllMap(){
  
      var mapdiv ={
      flex:1
    }
return         <div className="hg3-office-map-display" style={mapdiv}>
                  <HgRenderMapWithPanel locations={this.state.displayedLocationInMap}></HgRenderMapWithPanel>
            </div>
},
  changeMapLocation (location) {   
      this.setState({rerenderItem:!this.state.rerenderItem})
      this.setState({currentLocationId:location.id})
      this.setState({displayedLocationInMap:[location]})
  },


  render () {
   var parentdiv ={
      display:'flex'
    }
    return (
      <div className="hg3-visiting-offices-map" style={parentdiv}>
         {this.renderPagination()}
                  {!this.props.disableMap && !this.state.renderSpecificMap && this.renderAllMap()}
       
      </div>
    );
 }
});

export default VisitingOfficesMap;
