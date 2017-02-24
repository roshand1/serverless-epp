import './_hg-star-rating.less';
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
const HgStarRating = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    addReviewLink: PropTypes.bool,
    className: PropTypes.string,
    layout: PropTypes.oneOf(['', 'inline', 'single-line']),
    ratingScore: PropTypes.number,
    ratingTitle: PropTypes.string,
    responsesCount: PropTypes.number,
    size: PropTypes.oneOf(['', 'small', 'medium', 'large']),
    starsOnly: PropTypes.bool
  },
  getDefaultProps () {
    return {
      addReviewLink: false,
      className: '',
      layout: '',
      ratingScore: 0,
      ratingTitle: '',
      responsesCount: 0,
      size: '',
      starsOnly: false
    };
  },
  renderRatingLabel () {
    const s = this.props.responsesCount !== 1 ? 's' : '';
    if (this.props.addReviewLink) {
      return (
        <a
          className="js-profile-scroll-link"
          data-id="js-section-review"
          data-tabname="reviewTab">
          {this.renderStars()}
          <span className="rating-label">
            <span className="label-count">{this.props.responsesCount}</span>
            <span className="label-responses">{` review${s}`}</span>
            <span style={{ marginLeft: 5 }}>| leave a review</span>
          </span>
        </a>
      );
    }
    return (
      <span className="rating-label">
        <span className="label-count">{this.props.responsesCount}</span>
        <span className="label-responses">{` review${s}`}</span>
      </span>
    );
  },
  renderStars () {
    return (
      <span className="rating-stars" />
    );
  },
  renderRatingTitle () {
    return (
      <h6 className="rating-title">
        {this.props.ratingTitle}
      </h6>
    );
  },
  render () {
    const classList = {
      'hg3-star-rating' : true,
      ['rating-layout-' + this.props.layout] : !!this.props.layout,
      ['rating-size-' + this.props.size] : !!this.props.size,
      ['rating-score-' + this.props.ratingScore] : true
    };
    const renderUnlinkedStars = this.props.starsOnly || !this.props.addReviewLink;
    return (
      <div className={classNames(classList, this.props.className)}>
        {this.props.ratingTitle !== '' && this.renderRatingTitle()}
        {renderUnlinkedStars && this.renderStars()}
        {!this.props.starsOnly && this.renderRatingLabel()}
      </div>
    );
  }
});
export default HgStarRating;