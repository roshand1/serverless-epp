import './_hg-section-title.less';

import React, { PropTypes } from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import classNames from 'classnames';

import HgCoin from '@hg/three-ui/HgCoin';
import HgIcon from '@hg/three-ui/HgIcon';

const HgSectionTitle = React.createClass({

  mixins: [PureRenderMixin],

  propTypes : {
    chevron: PropTypes.oneOf(['', 'up', 'down', 'left']),
    icon: PropTypes.string,
    isMobile: PropTypes.bool,
    titleColor: PropTypes.string,
    titleText: PropTypes.string
  },

  getDefaultProps () {
    return {
      chevron: ''
    };
  },

  render () {

    const classList = {
      'hg3-section-header' : true,
      [this.props.titleColor] : true,
      'mobile' : this.props.isMobile
    };

    return (
      <div className="section-title-wrap">
      <div className={classNames(classList)}>
        <HgCoin
          border={!this.props.isMobile}
          size="sm" >
          <HgIcon icon={this.props.icon} />
        </HgCoin>
        <h4 className="title-text" data-id="hgSecTitleTitleTxt">{this.props.titleText}</h4>
        {!!this.props.chevron && <HgIcon icon={`chevron-${this.props.chevron}`} />}
      </div>
      </div>
    );
  }
});

export default HgSectionTitle;
