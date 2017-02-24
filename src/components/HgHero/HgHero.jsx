import './_hg-hero.less';
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import HgIcon from '@hg/three-ui/HgIcon';
 
const HgHero = React.createClass({
 
  mixins: [PureRenderMixin],
  propTypes : {
    heroImage: PropTypes.string,
    practiceName: PropTypes.string,
    videoLink: PropTypes.string,
    videoCaption: PropTypes.string,
    videoThumbnail: PropTypes.string
  },
 
  getInitialState: function(){
    return {
            hide: false
        };
    },
    showVideo() {
      this.setState({ hide: true });
  },
 
  renderVideo(){
    if(this.state.hide){
    return  <iframe src={this.props.videoLink} allowfullscreen></iframe>
    }
   
    else{ return <div className="hide">
    <div className="video-thumb"><img onClick={this.showVideo} src={this.props.heroImage}/></div>
    </div> }
 
  },
  render () {
    const heroBg = { background: `url(${this.props.heroImage}) top center no-repeat` };
    
    if (!this.props.videoLink) {
      return (
        <div id="hero" style={heroBg}>
          <h1 data-id="hgHeroPracName">{this.props.practiceName}</h1>
        </div>
        );
    } else {
      return (
        <div className="provider-video-wrapper">
           {this.renderVideo()}
        </div>
      );
    }
  }
});
 
export default HgHero;