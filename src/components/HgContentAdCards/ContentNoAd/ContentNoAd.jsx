import './_content-no-ad.less';
import React, { PropTypes } from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

const ContentNoAd = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    adPosition: PropTypes.number,
    closed: PropTypes.bool,
    content: PropTypes.object,
    showTips: PropTypes.number,
    suppressAd: PropTypes.bool,
    suppressContent: PropTypes.bool
  },

  getDefaultProps () {
    return {
      adPosition: 2,
      content: null,
      suppressAd: false,
      suppressContent: false
    };
  },

  tipAdvertisement () {
    return { __html: this.props.content.tipAdvertisement };
  },

  render () {
    const adStyle ={
      position:'relative',
      margin: '0 auto',
      width:'300px',
      height:'265px'
    };
    const accordionItem = this.props.closed ? { visibility: 'hidden', height:'0', padding: '0' } : {};

    //should add prop to get override from page def ie: Model.PageInformation.ContentLabel("RelatedContent", "");
    //<h3 className="section-intercept-title">Related Content</h3>

    return (
      <div className="hg3-section-intercept hg3-section-intercept-no-ads" id="js-section-intercept" style={accordionItem}>
        <ul>
          {this.props.content.contentIds.map( (contentId, index) => {
            let li = null;
            if (index === 0 && this.props.showTips) {
              li = (
                <li className="hg3-content-block js-profile-content-card js-ad-container" data-ad-type='dart' key={index} id={contentId}>
                  <div
                    className="advertisementContainer size_300x252 advertisement gpt advert"
                    style={adStyle}
                    id={`div-gpt-ad-card${this.props.showTips}`} />
                </li>
              );
            } else {
              li = (<li className="hg3-content-block js-profile-content-card" key={index} id={contentId} />);
            }
            return li;
          })
        }
      </ul>
    </div>);
  }
});

export default ContentNoAd;
