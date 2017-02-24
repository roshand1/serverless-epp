import './_hg-mini-provider-card.less';
import React, { PropTypes } from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import HgStarRating from './HgStarRating.jsx';
import HgClickToCall from './HgClickToCall.jsx';
const HgMiniProviderCard = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    displayName: PropTypes.string.isRequired,
    distance: PropTypes.number,
    hgoName: PropTypes.string,
    imageUrl: PropTypes.string,
    linkCardToProfile: PropTypes.bool,
    linkVars: PropTypes.string,
    phoneNumber: PropTypes.string,
    providerUrl: PropTypes.string,
    pwid: PropTypes.string,
    rating: PropTypes.shape({
      count: PropTypes.number,
      score: PropTypes.number,
      title: PropTypes.string
    }),
    showDistance: PropTypes.bool,
    specialty: PropTypes.string,
    suppressedSurvey: PropTypes.bool
  },
  renderComponent () {
    const s = this.props.distance !== 1 ? 's' : '';
    return (
      <div className="mini-provider-card-container">
        {!!this.props.imageUrl &&
          <div className="provider-image">
            <a
              className="mini-provider-card-link"
              href={this.props.providerUrl}>
              <img src={this.props.imageUrl} alt={this.props.displayName} />
            </a>
          </div>
        }
          <div className="provider-information">
            <a
              href={this.props.providerUrl}>
            <h4 className="provider-display-name">{this.props.displayName}</h4>
            {!!this.props.distance && this.props.showDistance &&
              <p className="provider-distance">
                {`located ${this.props.distance} mile${s} away`}
              </p>
            }
            {!!this.props.specialty &&
              <p className="provider-specialty">
                {this.props.specialty}
              </p>
            }
            {!this.props.suppressedSurvey &&
              <HgStarRating
                layout="inline"
                ratingScore={this.props.rating.score}
                responsesCount={this.props.rating.count}
                size="small" />
            }
            </a>
            {!!this.props.phoneNumber &&
              <p className="provider-phone">
                <HgClickToCall phoneNumber={this.props.phoneNumber} />
              </p>
            }
          </div>
      </div>
    );
  },
  render () {
    if ( !this.props.displayName ) { return null; }
    return (
      <div className="hg3-mini-provider-card hg-track" id={`provider-${this.props.pwid}`} data-hgoname={this.props.hgoName} data-linkvars={this.props.linkVars} >
        { this.renderComponent() }
      </div>
    );
  }
});
export default HgMiniProviderCard;