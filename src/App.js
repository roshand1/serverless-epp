import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import {getProvidersByFunc} from '../redux/action';
import * as actions from '../redux/action'; 
// import OfficeHours from './OfficeHours/OfficeHours.jsx'
import Providers from './components/HgOurProviders/HgOurProviders.jsx'

const App = React.createClass({

// componentWillMount(){
//  const { getProvidersByFunc} = this.props;
//  getProvidersByFunc();
// },
  
componentDidMount(){
 const { getProvidersByFunc} = this.props;
 getProvidersByFunc();
},

    render(){
        return <div> This is definitely a React app now!! after reloding
                    <div>{this.props.providers &&
                     <Providers isMobile={false} providerCount={this.props.providers.providers.providerCount} getProviderUrl={'something'} providerArr={this.props.providers.providers.providerArr}/>
                    }
                    </div>
                </div>
    }
})

const mapStateToProps = (state) => {
  return {
    
         providers: state,
    }
};
const mapDispatchToProps = (dispatch) => {
  return {
    getProviders: () => dispatch(getProvidersByFunc()),
  };
};

export default connect(mapStateToProps, actions)(App);
