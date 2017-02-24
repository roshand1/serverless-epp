import './_hg-logo.less';

import React, { PropTypes } from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

const HgLogo = React.createClass({

  mixins: [PureRenderMixin],

  propTypes : {
    imgSrc: PropTypes.string,
    practiceName: PropTypes.string,
    isPremium: PropTypes.bool
  },

  getDefaultProps () {
    return {
      isPremium: false
    };
  },

  render () {
    if (!!this.props.imgSrc) {
      return (
       <div>
        <div className="hg3-practice-logo">
           {this.props.isPremium && !!this.props.imgSrc && <HgLogo imgSrc={this.props.imgSrc} />}
        </div>
      <header>
        <h1 className="practice-name">{this.props.practiceName}</h1>
      </header>   
      </div>
      );
    } else {
      return (
        <div>
        <header>
          <h1 className="practice-name">{this.props.practiceName}</h1>
        </header>
        </div>
    );
    }
  }
});

export default HgLogo;
