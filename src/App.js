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
      debugger;
        let viewPracModel =this.props.store? this.props.store.practiceModel:'';
        let officeModel =viewPracModel?{officeLocations:viewPracModel.OfficeLocations}:'';
        let testimoniesModel = this.props.store? this.props.store.testimonialModel.Testimonies:'';

        return <div>{viewPracModel &&
            <div className="body-content container">
                      <div id="content-section">
                       <div id="inlineAds">
                      
                       </div>

                      <div className="content-left">
                      
                        <div id="component-hgHero">
                            <HgHero practiceName={viewPracModel.LogoWithVideo.practiceName }
                                  heroImage={viewPracModel.LogoWithVideo.heroImage} />
                        </div>

                         <div className="practice-info-wrapper componentWrap">
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
                          
                            {viewPracModel.ShowContentAdds && !viewPracModel.PageOptions.NoContentCards ?
                                <div id="component-hgAddContent"  class="content-and-ad"><HgContentAndAd {...viewPracModel.ContentCards}/></div> : <div id="component-hgAddContent"  class="content-and-ad"><HgContentAndAd {...viewPracModel.ContentCards}/></div>
                            }

                          {testimoniesModel.length >0 &&
                           <div id="component-testimonies" class="componentWrap">
                                <HgTestimonial testimonies={testimoniesModel}/>
                           </div>
                          }

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
                            <div id="component-practices" className="componentWrap">
                                <HgOfficeLocation isiPad={false} isMobile={false} visiting={officeModel}/>
                            </div>
                              
                            {!viewPracModel.UpOneLevel &&  
                            <div id="breadcrumb">                              
                                <span itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="breadcrumbLink">
                                    <a href={viewPracModel.UpOneLevel} 
                                        title={viewPracModel.OfficeCity} 
                                        data-hgoname="breadcrumb-navigation-link" 
                                        itemprop="url">
                                            <span itemprop="title">See more group practices in {viewPracModel.OfficeCity}.</span>
                                    </a>
                                </span>
                            </div>
                            }   

                      </div>


                            <div id="component-footer">
                                <HgFooter footer={viewPracModel.FooterModel.footer}/>
                            </div>
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
