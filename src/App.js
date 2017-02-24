import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import {getProvidersByFunc} from '../redux/action';
import * as actions from '../redux/action';

// React Components
import HgHero from './components/HgHero/HgHero.jsx' 
import HgPracticeInfo from './components/HgPracticeInfo/HgPracticeInfo.jsx' 
import HgPracticeLinks from './components/HgPracticeLinks/HgPracticeLinks.jsx' 
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
        var viewPracModel =this.props.practiceModel? this.props.practiceModel.practiceModel:'';

        return <div>{viewPracModel &&
                      <div id="content-section">
                        <div id="component-hgHero">
                            <HgHero practiceName={viewPracModel.LogoWithVideo.practiceName }
                                  heroImage={viewPracModel.LogoWithVideo.heroImage} />
                        </div>
                         <div className="practice-info-wrapper">
                            <div id="component-hgOfficeInfo">
                                <HgPracticeInfo
                                acceptsNewPatients={viewPracModel.PracticeInfo.acceptsNewPatients}
                                address={viewPracModel.PracticeInfo.address}
                                isMobile={viewPracModel.PracticeInfo.isMobile}
                                isPremium={viewPracModel.PracticeInfo.isPremium}
                                logoImageSrc={viewPracModel.PracticeInfo.logoImageSrc}
                                numberOfOffices={viewPracModel.PracticeInfo.numberOfOffices}
                                phoneNumber={viewPracModel.PracticeInfo.phoneNumber}
                                officeHours={viewPracModel.PracticeInfo.officeHours}
                                practiceName={viewPracModel.PracticeInfo.practiceName}
                                moreInfoLink={viewPracModel.PracticeInfo.moreInfoLink} />
                            </div>
                          </div>
                          <div className="practice-links clearfix">
                            <section id="component-hgPracticeLinks">
                                {viewPracModel.ShowAboutUs && 
                                    <HgPracticeLinks coinOpts={viewPracModel.AboutUsLinkModel.coinOpts}
                                    href={viewPracModel.AboutUsLinkModel.href}
                                    icon={viewPracModel.AboutUsLinkModel.icon}
                                    isPremium={viewPracModel.AboutUsLinkModel.isPremium}
                                    titleColor={viewPracModel.AboutUsLinkModel.titleColor}
                                    titleText={viewPracModel.AboutUsLinkModel.titleText}/>
                                }
                                {viewPracModel.ShowServices && 
                                    <HgPracticeLinks coinOpts={viewPracModel.ServicesLinkModel.coinOpts}
                                    href={viewPracModel.ServicesLinkModel.href}
                                    icon={viewPracModel.ServicesLinkModel.icon}
                                    isPremium={viewPracModel.ServicesLinkModel.isPremium}
                                    titleColor={viewPracModel.ServicesLinkModel.titleColor}
                                    titleText={viewPracModel.ServicesLinkModel.titleText}/>
                                }
                                {viewPracModel.ShowProviders && 
                                    <HgPracticeLinks coinOpts={viewPracModel.ProvidersLinkModel.coinOpts}
                                    href={viewPracModel.ProvidersLinkModel.href}
                                    icon={viewPracModel.ProvidersLinkModel.icon}
                                    isPremium={viewPracModel.ProvidersLinkModel.isPremium}
                                    titleColor={viewPracModel.ProvidersLinkModel.titleColor}
                                    titleText={viewPracModel.ProvidersLinkModel.titleText}/>
                                }
                                {viewPracModel.ShowPractices && 
                                    <HgPracticeLinks coinOpts={viewPracModel.PracticesLinkModel.coinOpts}
                                    href={viewPracModel.PracticesLinkModel.href}
                                    icon={viewPracModel.PracticesLinkModel.icon}
                                    isPremium={viewPracModel.PracticesLinkModel.isPremium}
                                    titleColor={viewPracModel.PracticesLinkModel.titleColor}
                                    titleText={viewPracModel.PracticesLinkModel.titleText}/>
                                }
                            </section>
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
