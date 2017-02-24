import './_hg-our-providers.less';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import HgMiniProviderCard from './HgMiniProviderCard.jsx';
import HgPaginationComp from '../../../utils/serverSidePagination.jsx';
import _fetch from '../../../utils/HelperFetch';

const HgOurProviders =  React.createClass({

  mixins: [PureRenderMixin],

  propTypes : {
    isMobile: PropTypes.bool,
    providerCount:PropTypes.number,
    getProviderUrl:PropTypes.string, // This is the url to make an api call to get providers for specific practice. 
    providerArr: PropTypes.array.isRequired, // array of providers,
  },

   getInitialState: function(){
          return {displayList:this.props.providerArr};
    }, 

     componentDidMount: function(){
        this.renderProviders();
    },

  renderProviderText(){
      if (this.props.providerCount == 0){
      return <span>There are no providers currently practicing at this location.</span>
      }
      else if (this.props.providerCount == 1){
      return <span>There is 1 provider currently practicing at this location.</span>
      }
      else{
        return <span>There are {this.props.providerCount} providers currently practicing at this location.</span>
      }
  },
    pageChange: function(pageNumber){
    var skip = (pageNumber-1)*10;
    var take = 10;
    var url = "&skip="+skip+"&take="+take;
      _fetch(this.props.getProviderUrl + url,{method:'GET'},function(status, response){
        if (status =='OK')
        {
          this.setState({displayList: response.providerArr});
        }
      }.bind(this))
  },

  renderProviders () {
    let providers = [];
    this.state.displayList.map((provider) => {
      providers.push(
        <div>
        <div className="provider-wrap" key={provider.pwid}>
          <HgMiniProviderCard {...provider} key={provider.pwid}/>
        </div>

          </div>
      );
    });
    return providers;
  },

  render () {
    if (this.props.providerArr.length > 0) {
      return (
        
        <section className="hg3-practice-providers">
          <div className="hg3-practice-providers-content" data-id="hgOurProvProvArray">
            <p className="provider-message">
              {this.renderProviderText()}
            </p>  
            <div>
              <HgPaginationComp itemCountPerPage={10} 
                                totalItemCount={this.props.providerCount} 
                                onClick={this.pageChange}
                                displayList={this.renderProviders()}/>
            </div>
          </div>
        </section>
      );
    }
    return null;
  }
});
export default HgOurProviders;
