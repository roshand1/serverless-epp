import './_hg-practice-links.less';

import React, { PropTypes } from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import classNames from 'classnames';

import HgCoin from '@hg/three-ui/HgCoin';
import HgIcon from '@hg/three-ui/HgIcon';

const HgPracticeLinks =  React.createClass({

  mixins: [PureRenderMixin],

  propTypes : {
    children: PropTypes.any,
    coinOpts: PropTypes.object, // size, border, inverse
    href: PropTypes.string,
    icon: PropTypes.string,
    titleColor: PropTypes.oneOf(['gray', 'blue', 'teal', 'seafoam', 'green', 'white']),
    titleText: PropTypes.string
  },

  render () {
    const colorTitle = `title-color-${this.props.titleColor}`;
    const href = !!this.props.href ? this.props.href : '#';

    return (
      <div className="practice-link">
        <h2 className={classNames('section-title', colorTitle)} data-id="hgPracLinksChildren">
          <a href={href} data-id="hgPracLinksUrl">
            <HgCoin {...this.props.coinOpts} >
              <HgIcon icon={this.props.icon} />
            </HgCoin>
            <span className="title-text" data-id="hgPracLinksTitleTxt">{this.props.titleText}</span>
          </a>
          {this.props.children}
        </h2>
      </div>
    );
  }
});

export default HgPracticeLinks;
