import './_hg-ContentAndAd.less';

import React, { PropTypes } from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import classNames from 'classnames';
import HGContentCard from '@hg/content-ui/src/components/HGContentCard';

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
    suppressContent: PropTypes.bool,
    cards:React.PropTypes.array,
    handleClick: React.PropTypes.func
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
        <div id="cardContainer">
            <div className={classNames(classList)} id="js-section-intercept" style={accordionItem}>
        <ul>
            {this.props.content.contentIds.map( (contentId, index) => {
                let li = null;    
                if (this.props.adPosition === index && !this.props.suppressAd) {
            li=(
             <li className="hg3-content-block ad-container js-ad-container hg3-ad-container ad-border"
                 key={index}
                 data-ad-type={this.props.content.adType}>
                 <div id={contentId}>

                 </div>
                 </li>);
                 } else {
                 li = (
                <li className="hg3-content-block ad-container js-ad-container hg3-ad-container ad-border"
                    key={index}
                    data-ad-type={this.props.content.adType} >
                    <a className="hg3-content-card hg-track" data-hgoname={this.props.cards[index].hgoName} href={this.props.cards[index].cardJson.properties.contentUrl}>
                        <div className="hg3-promo-image">
                        <img src={this.props.cards[index].cardJson.properties.promoImage} />
                        </div>
                        <div className="content-area">
                        <h4 className="title" itemProp="title">
                            <span> </span>
                            <span>{this.props.cards[index].cardJson.headline}</span>
                        </h4>
                    </div>
                    </a>
                </li>
            ) ; 
            }
            return li;
            })
            }
        </ul>
            </div>
    </div>
  );
  }
});

export default ContentAndAd;
