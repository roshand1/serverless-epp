import './_hg-eppRightRail.less';
import './App.less'
import './index.less'
import './templateStyle.scss'
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import {getProvidersByFunc} from '../redux/action';
import * as actions from '../redux/action';

import HgHero from './components/HgHero/HgHero.jsx' 
import HgInsurance from './components/HgInsurance/HgInsurance.jsx' 
import HgServices from './components/HgInsurance/HgInsurance.jsx' 
import HgPracticeInfo from './components/HgPracticeInfo/HgPracticeInfo.jsx' 
import HgPracticeLinks from './components/HgPracticeLinks/HgPracticeLinks.jsx'  
import HgOurProviders from './components/HgOurProviders/HgOurProviders.jsx'
import HgOfficeLocation from './components/HgOfficeLocation/HgOfficeLocation.jsx'
import HgTestimonial from './components/HgTestimonial/Testimonial.jsx'
import HgContentAndAd from './components/HgContentAdCards/ContentAndAd';
//import HgInlineAds from './components/HgContentAdCards/HgInlineAds/HgInlineAds.jsx';
// import OfficeHours from './OfficeHours/OfficeHours.jsx'
// import LeafLet from './components/HgLeaflet/HgLeaflet.jsx'

import HgFooter from '@hg/syndicated-ui/src/components/HgFooter/HgFooter';

const App = React.createClass({
  
componentDidMount(){
 const { getPracticeModel} = this.props;
 getPracticeModel();
},
    render(){
        let viewPracModel =this.props.store? this.props.store.practiceModel:'';
        let officeModel =viewPracModel?{officeLocations:viewPracModel.OfficeLocations}:'';
        if(viewPracModel)
        {
            if(viewPracModel.FooterModel && viewPracModel.FooterModel.footer){
            viewPracModel.FooterModel.footer.footerLogo = "https://www.healthgrades.com/uisvc/v1_0/EPPUIService/public3/images/healthgrades-logo.svg";
            }
            if(viewPracModel.LogoWithVideo)
            {
                viewPracModel.LogoWithVideo.heroImage = "https://www.healthgrades.com/uisvc/v1_0/EPPUIService/public3/images/movie.jpg";
            }
        }

        return <div>{viewPracModel &&
            <div className="body-content container">
                      <div id="content-section">
                      <div id="header-section">
                         <div className="hg3-header">
                                <span className="hg3-brand" title="Healthgrades" href="">
                                    <span className="sr-only">Healthgrades</span>
                                </span>
                                <div className="hg3m-nav">
                                    <label className="hg3m-nav-toggle" for="mobileNav"></label>
                                    <div className="nav-content">
                                        <div>
                                            <div className="blur-on-request"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 className="practice-name">{viewPracModel.LogoModel.practiceName} </h1>
                        </div>

                      <div className="content-left">
                      
                      {viewPracModel.ShowHero && !viewPracModel.NoMovie &&
                        <div id="component-hgHero">
                            <HgHero {...viewPracModel.LogoWithVideo }/>
                        </div>
                      }
                      
                        <div className="practice-info-wrapper componentWrap">
                            <div id="component-hgOfficeInfo">
                                <HgPracticeInfo {...viewPracModel.PracticeInfo} />
                            </div>
                        </div>
                        {viewPracModel.ShowContentAdds && !viewPracModel.PageOptions.NoContentCards ?
                                <div id="component-hgAddContent"  className="content-and-ad"><HgContentAndAd {...viewPracModel.ContentCards}/></div> : <div id="component-hgAddContent"  className="content-and-ad"><HgContentAndAd {...viewPracModel.ContentCards}/></div>
                        }

                      {viewPracModel.PageOptions && viewPracModel.PageOptions.NoInsurance &&
                        <div id="component-hgInsurance" className="componentWrap">
                            <HgInsurance {...viewPracModel.InsuranceModel }/>
                        </div>
                      }
                      {viewPracModel.ShowServices &&viewPracModel.PageOptions && !viewPracModel.PageOptions.NoServices &&
                          <div id="component-services" className="componentWrap">
                            <HgServices {...viewPracModel.ServicesInfo}/>
                          </div>
                      }
                          {viewPracModel.Testimonies.testimonyUrl &&
                           <div id="component-testimonies" className="componentWrap">
                                <HgTestimonial url={'https://s3.amazonaws.com/'+viewPracModel.Testimonies.testimonyUrl}/>
                           </div>
                          }

                           
                            {viewPracModel.ProviderListModel &&
                                 <div>
                                  <div id="component-hgProviders" className="componentWrap">
                                    <h2>Our Providers</h2>
                                    <HgOurProviders isMobile={viewPracModel.ProviderListModel.isMobile}
                                    providerArr={viewPracModel.ProviderListModel.providerArr}
                                    providerCount={viewPracModel.ProviderListModel.providerCount}
                                    getProviderUrl={viewPracModel.ProviderListModel.getProviderUrl}
                                    practiceId={viewPracModel.PracticeId}/>
                                    <br className="clearBoth"/>
                                </div>
                            </div>
                            }
                               
                            <div id="component-practices" className="componentWrap">
                                <HgOfficeLocation isiPad={false} isMobile={false} visiting={officeModel}/>
                            </div>
                              
                            {!viewPracModel.UpOneLevel &&  
                            <div id="breadcrumb">                              
                                <span className="breadcrumbLink">
                                    <a href={viewPracModel.UpOneLevel} 
                                        title={viewPracModel.OfficeCity} 
                                        data-hgoname="breadcrumb-navigation-link">
                                            <span>See more group practices in {viewPracModel.OfficeCity}.</span>
                                    </a>
                                </span>
                            </div>
                            }   

                      </div>
                      {viewPracModel.FooterModel &&
                            <div id="component-footer">
                                <HgFooter footer={viewPracModel.FooterModel.footer}/>
                            </div>
                      }
                      </div>
                    </div>
                    }
                </div>
    }
})

const mapStateToProps = (state) => {
  return {
    
         store: state,
    }
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPracticeModel: () => dispatch(getPracticeModel()),
  };
};

export default connect(mapStateToProps, actions)(App);
