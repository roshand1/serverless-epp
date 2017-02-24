import './_hg-our-providers.less';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {getProvidersByOfficeId} from '../../../redux/action';
import * as actions from '../../../redux/action';
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
    practiceId:PropTypes.string
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
    const { getProvidersByPracticeId} = this.props;
      getProvidersByPracticeId(this.props.practiceId,skip,take);
  },

  renderProviders () {
    let providers = [];
    this.props.providerArr.map((provider) => {
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
const mapStateToProps = (state) => {
  if (state.providers){
  return {
         providerArr: state.providers.providerArr,
    }
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProvidersByPracticeId: () => dispatch(getProvidersByPracticeId()),
  };
};
export default connect(mapStateToProps, actions)(HgOurProviders);
