import React, { PropTypes } from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import classNames from 'classnames';

const ContentAndAd = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    adPosition: PropTypes.number,
    hideTips: PropTypes.bool,
    content: PropTypes.object,
    closed: PropTypes.bool,
    onMount: PropTypes.object,
    showTips: PropTypes.number,
    suppressAd: PropTypes.bool,
    suppressContent: PropTypes.bool
  },

  getDefaultProps () {
    return {
      adPosition: 2,
      content: null,
      hideTips: false,
      suppressAd: false,
      suppressContent: false
    };
  },

  getInitialState () {
    return this.props;
  },

  componentDidMount () {
    this.onDidMount();
  },

  onDidMount () {
    const { onMount } = this.props;

    if (onMount && onMount.hideTips) {
      this.setState({ hideTips: onMount.hideTips() });
    }
  },

  advertisement () {
    return { __html: this.props.content.tipAdvertisement };
  },

  shouldRender () {
    return !this.state.hideTips;
  },

  render () {
    const adStyle = {
      position:'relative',
      margin: '0 auto',
      width:'300px',
      height:'265px'
    };

    const accordionItem = this.props.closed ? { visibility: 'hidden', height: 0, padding: 0 } : {};
    const classList = {
      'hg3-section-intercept': true,
      'hg3-section-intercept-no-ads' : this.props.suppressAd
    };

    if (!this.shouldRender()) return null;

    return (
      <div className={classNames(classList)} id="js-section-intercept" style={accordionItem}>
        <ul>
          {this.props.content.contentIds.map( (contentId, index) => {
            let li = null;
            if (this.props.adPosition === index && !this.props.suppressAd) {
              this.props.content.firstAdPlacement ?
                li = (<li className="hg3-content-block ad-container js-ad-container hg3-ad-container ad-border"
                        key={index}
                        data-ad-type={this.props.content.adType}
                        dangerouslySetInnerHTML={this.advertisement()}  />
                ) :
                li = (<li className="hg3-content-block ad-container js-ad-container hg3-ad-container ad-border"
                        key={index}
                        data-ad-type={this.props.content.adType} />);
            } else {
              if (index === 0 && this.props.showTips) {
                li = (<li className="hg3-content-block js-profile-content-card"
                        data-ad-type='dart'
                        key={index}
                        id={contentId}>
                        <div
                          className="advertisementContainer size_300x252 advertisement gpt advert"
                          style={adStyle}
                          id={`div-gpt-ad-card${this.props.showTips}`} />
                      </li>);
              } else {
                li = (<li className="hg3-content-block js-profile-content-card" key={index} id={contentId} />);
              }
            }
            return li;
          })
        }
      </ul>
    </div>
  );
  }
});

export default ContentAndAd;
