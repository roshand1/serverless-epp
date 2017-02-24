import './_hg-practice-info.less';

import React, { PropTypes } from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import classNames from 'classnames';

import HgIcon from '@hg/three-ui/HgIcon';
import HgClickToCall from '@hg/pdc-ui/src/components/HgClickToCall/HgClickToCall';
import HgLeaflet from '../HgLeaflet';
import HgLogo from '../HgLogo';

const HgPracticeInfo = React.createClass({

  mixins: [PureRenderMixin],

  propTypes : {
    acceptsNewPatients: PropTypes.bool,
    address: PropTypes.string,
    directionsUrl: PropTypes.string,
    mapOpts: PropTypes.object,
    isMobile: PropTypes.bool,
    isPremium: PropTypes.bool,
    logoImageSrc: PropTypes.string,
    insuranceLink: PropTypes.string,
    moreInfoLink: PropTypes.string,
    numberOfOffices: PropTypes.number,
    officeHours: PropTypes.array,
    phoneNumber: PropTypes.string,
    practiceName: PropTypes.string,
    scrollCallback: PropTypes.func
  },

  getDefaultProps () {
    return {
      isMobile: false,
      isPremium: false,
      scrollCallback: null
    };
  },

  renderOfficeLocationText(){

if (this.props.numberOfOffices > 1){
  return this.props.numberOfOffices -1 == 1? <span>View our {this.props.numberOfOffices -1} other location</span>:<span>View our {this.props.numberOfOffices -1} other locations</span>
}
   
  },

  scrollToOfficeHours (e) {
    e.preventDefault();
    if (!!this.props.scrollCallback) {
      this.props.scrollCallback();
    }
    return null;
  },

  renderOfficeHours () {
    let date = new Date();
    let today = date.getDay();
    let todaysHours = this.props.officeHours.filter((obj) => parseInt(obj.dayOfWeek) === parseInt(today));

    if (todaysHours[0]) {
      let todayObj = todaysHours[0];
      return (
        <li>
          <HgIcon icon="clock-o"/>
          <strong>{todayObj.dayOfWeekName + '\'s Hours:'}</strong>
            {todayObj.isClosed ? ' Closed' : ` ${todayObj.startTime} - ${todayObj.endTime}`}
          <a onClick={this.scrollToOfficeHours} style={{ display: 'block' }}>
            View Office Hours <HgIcon icon="chevron-down"/>
          </a>
        </li>
      );
    }

    return null;
  },

  render () {
    const classList = {
      'hg3-practice-information' : true,
      'desktop': !this.props.isMobile,
      'premium': this.props.isPremium
    };
    return (
      <section className={classNames(classList)}>
        <div className="practice-body">
          <div className="hg3-map-container">
            <HgLeaflet {...this.props.mapOpts} />
          </div>
          <div className="hg3-office-info">
            <ul data-id="hgPracInfoPracAddress">
              <li>
                <HgIcon icon="map-marker"/>{this.props.address}
                {!!this.props.directionsUrl &&
                  <a style={{ display: 'block' }} href={this.props.directionsUrl}>Get directions <HgIcon icon="chevron-right"/></a>
                }
                {this.props.numberOfOffices > 1 && <a style={{ display: 'block' }} href="#">
                  {this.renderOfficeLocationText()} <HgIcon icon="chevron-right"/></a> }
              </li>
              <li className="hg-track" data-hgoname={this.props.phoneNumber} data-linkvars={"hg.ClickToCallNumber="+this.props.phoneNumber}>
                  {this.props.phoneNumber && <HgIcon icon="phone"/>}{this.props.isMobile ? <HgClickToCall icon="phone" phoneNumber={this.props.phoneNumber} /> : this.props.phoneNumber }
              </li>
              {Array.isArray(this.props.officeHours) && this.renderOfficeHours()}
              {this.props.moreInfoLink && <a target="_blank" data-id="practiceUrl" href={this.props.moreInfoLink}>View Practice Website ></a>}
            </ul>
          </div>
        </div>
      </section>
    );
  }
});

export default HgPracticeInfo;
