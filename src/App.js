import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import {getProvidersByFunc} from '../redux/action';
import * as actions from '../redux/action';

// React Components
import HgHero from './components/HgHero/HgHero.jsx' 
// import OfficeHours from './OfficeHours/OfficeHours.jsx'
import Providers from './components/HgOurProviders/HgOurProviders.jsx'
// import LeafLet from './components/HgLeaflet/HgLeaflet.jsx'

const App = React.createClass({

// componentWillMount(){
//  const { getProvidersByFunc} = this.props;
//  getProvidersByFunc();
// },
  
componentDidMount(){
 const { getPracticeModel} = this.props;
 getPracticeModel();
},
//  <Providers isMobile={false} providerCount={this.props.providers.providers.providerCount} getProviderUrl={'something'} providerArr={this.props.providers.providers.providerArr}/>
    render(){
      debugger;
        var viewPracModel =this.props.practiceModel? this.props.practiceModel.practiceModel:null;

        return <div>{viewPracModel &&
                      <div id="content-section">
                        <div id="component-hgHero">
                            <HgHero practiceName={viewPracModel.LogoWithVideo.practiceName }
                                  heroImage={viewPracModel.LogoWithVideo.heroImage} />
                        </div>
                      </div>
                    }
                </div>
    }
})

const mapStateToProps = (state) => {
  return {
    
         practiceModel: state,
    }
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPracticeModel: () => dispatch(getPracticeModel()),
  };
};

export default connect(mapStateToProps, actions)(App);
