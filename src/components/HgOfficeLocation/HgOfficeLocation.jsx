// Also known as VisitingSection component in the provider UI repo. Took out parts that we didn't need.
import './_hg-office-location.less';

import React, { PropTypes } from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import classNames from 'classnames';
import VisitingOfficesCarousel from './VisitingOfficesCarousel';
import VisitingOfficesMap from './VisitingOfficesMap';
import HgPaginationComp from '../../../utils/pagination.jsx';

const HgOfficeLocation = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    device: PropTypes.string,
    isiPad: PropTypes.bool,
    isMobile: PropTypes.bool,
    visiting: PropTypes.object
  },

  getDefaultProps () {
    return {
     visiting: null
    };
  },

  getInitialState () {
    return {
   //   closed: false
    };
  },

    renderOfficeLocation(){
      

    },
  render () {
    if (this.props.visiting === null) return null;

    const { visiting } = this.props;

    const classList = {
      'mobile' : this.props.isMobile,
      'desktop' : !this.props.isMobile,
      'closed' : this.state.closed,
      'open'   : !this.state.closed
    };

    return (
      <section className="office-location">
        <div className="hg-section-container" id="hg-visit-row">
          <div className="hg-sticky-col hg-sticky-col-left">
            <div className="hg3-visiting-offices-container">
              {this.props.isMobile ?
              <VisitingOfficesCarousel
                closed={this.state.closed}
                {...this.props.visiting} />
              :
              <VisitingOfficesMap
                isiPad={this.props.isiPad}
                isMobile={this.props.isMobile}
                officeLocations={visiting.officeLocations} />
              }
            </div>
          </div>
        </div>
      </section>
    );
  }
});

export default HgOfficeLocation;
