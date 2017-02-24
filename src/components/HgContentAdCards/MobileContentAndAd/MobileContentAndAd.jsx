import React, { PropTypes } from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

const MobileContentAndAd = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    content: PropTypes.object,
    showAboveRightAd: PropTypes.bool,
    pitchforkAdPosition: PropTypes.number,
    tipsDartPosition: PropTypes.number
  },

  getDefaultProps () {
    return {
      content: null,
      showAboveRightAd: false,
      pitchforkAdPosition: 0,
      tipsDartPosition: 0
    };
  },

  renderAboveRightAd () {
    if (this.props.showAboveRightAd === false) return;
    return (
      <div className="hg3-content-block ad-container js-ad-container hg3-ad-container ad-border" data-ad-type="AboveRight">
        <div className='advertisement-container size_h300w250 advertisement gpt' id='div-gpt-ad-aboveright1'></div>
      </div>
    );
  },

  renderPitchForkAd () {
    if (this.props.pitchforkAdPosition === 0) return;

    return (
      <div className="hg3-content-block ad-container js-ad-container hg3-ad-container ad-border" data-ad-type="PitchFork">
        <div className="advertisement-container size_h300w250 advertisement gpt" id={'div-gpt-ad-pitchfork' + this.props.pitchforkAdPosition}></div>
      </div>
    );
  },

  renderTipOrContent (index, contentId) {
    if (!this.props.content && this.props.tipsDartPosition > 0) {
      return (
        <div className="carousel-items js-carousel-items" style={{ width: 'auto' }} >
          <div className="carousel-item js-profile-content-card js-ad-container" data-ad-type='dart' key={index} id={contentId} >
            <div className="advertisementContainer size_300x252 advertisement gpt advert" id={'div-gpt-ad-card' + this.props.tipsDartPosition} />
          </div>
        </div>
      );
    }

    if (this.props.content) {
      return (
        <div className="carousel-items js-carousel-items" style={{ width: 'auto' }} >
        {this.props.content.contentIds.map( (contentId, index) => {
          if (index === 0 && this.props.tipsDartPosition > 0) {
            return (
              <div className="carousel-item js-profile-content-card js-ad-container" data-ad-type='dart' key={index} id={contentId} >
                <div className="advertisementContainer size_300x252 advertisement gpt advert" id={'div-gpt-ad-card' + this.props.tipsDartPosition} />
              </div>
            );
          } else {
            return (<div className="carousel-item js-profile-content-card" key={index} id={contentId}></div>);
          }
        })
        }
        </div>
      );
    }
  },

  renderAdAndTipsAndContent () {
    if ((!this.props.content || this.props.content.contentIds.length === 0)
      && this.props.tipsDartPosition === 0
      && this.props.pitchforkAdPosition === 0
      && this.props.showAboveRightAd === false) return;

    return (
      <section className="hg3-section-intercept hg3m" id="js-section-intercept">
        {this.renderAboveRightAd()}
        {this.renderPitchForkAd()}
        <div className='hg3-profile-carousel js-carousel-container'>
          {this.renderTipOrContent()}
        </div>
      </section>
    );
  },

  render () {
    return (
      <div className="hg3-mobile-content-and-ad">
        {this.renderAdAndTipsAndContent()}
      </div>
    );
  }
});

export default MobileContentAndAd;
