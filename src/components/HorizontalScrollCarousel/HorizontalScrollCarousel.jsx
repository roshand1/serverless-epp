import './_horizontal-scroll-carousel.less';

import React, { PropTypes } from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import classNames from 'classnames';

const HorizontalScrollCarousel = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    children: PropTypes.array,
    className: PropTypes.string,
    isMobile: PropTypes.bool,
    itemWidth: PropTypes.number,
    snapOnScroll: PropTypes.bool
  },

  getDefaultProps () {
    return {
      className: '',
      itemWidth: 320,
      snapOnScroll: false
    };
  },

  render () {
    if (!this.props.children || this.props.children.length === 0) { return null; }

    const classList = {
      'hg-horizontal-carousel' : true,
      [this.props.className] : !!this.props.className
    };

    let renderChildren = React.Children.map(this.props.children, child => {
      return (
        <div
          className="hg-flex-cell"
          style={{ width: this.props.itemWidth }}>
          {child}
        </div>
      );
    });

    return (
      <div className={classNames(classList)}>
        <div className="carousel-container">
          <div
            className="hg-flex-row"
            style={{ width: this.props.children.length * this.props.itemWidth }}>
            {renderChildren}
          </div>
        </div>
      </div>
    );
  }
});

export default HorizontalScrollCarousel;
