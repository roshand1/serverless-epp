import './_visiting-offices-carousel.less';

import React, { PropTypes } from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import Carousel from '../HorizontalScrollCarousel';
import MobileOfficeCard from '../MobileOfficeCard';

const VisitingOfficesCarousel = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    device: PropTypes.string,
    isDesignated: PropTypes.bool,
    isEpp: PropTypes.bool,
    isiPad : PropTypes.bool,
    isMobile: PropTypes.bool,
    isMarketTargeted: PropTypes.bool,
    location: PropTypes.shape({
      city: PropTypes.string,
      label: PropTypes.string,
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      name: PropTypes.string,
      postalCode: PropTypes.string,
      practiceName: PropTypes.string,
      state: PropTypes.string
    }),
    officeLocations: PropTypes.array,
    provider: PropTypes.object
  },

  render () {
    let officeLocations = this.props.officeLocations.map((location) => {
      return (
        <div className="flex-cell">
          <MobileOfficeCard
            city={location.city}
            directionsButtonId={location.directionsButtonId}
            directionsUrl={location.directionsUrl}
            id={location.id}
            isDesignated={this.props.isDesignated}
            isMarketTargeted={this.props.isMarketTargeted}
            key={`officeLocation-${location.id}`}
            latitude={location.latitude}
            longitude={location.longitude}
            name={location.name}
            officeHours={location.officeHours}
            postalCode={location.postalCode}
            state={location.state}
            street={location.street} />
        </div>
      );
    });

    return (
      <div className="visiting-offices-carousel">
        <div className="hg3-horizontal-carousel">
          <Carousel
            itemWidth={280}
            isMobile={this.props.isMobile}>
            {officeLocations}
          </Carousel>
        </div>
      </div>
    );
  }
});

export default VisitingOfficesCarousel;
