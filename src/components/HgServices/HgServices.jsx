import './_hg-services.less';

import React, { PropTypes } from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import classNames from 'classnames';
import HgSectionTitle from '../HgSectionTitle';
import Button from '@hg/three-ui/HgButton';

const HgServices = React.createClass({

  mixins: [PureRenderMixin],

  propTypes : {
    isMobile: PropTypes.bool,
    isPremium: PropTypes.bool,
    practiceName: PropTypes.string,
    paginate: PropTypes.bool,
    servicesPerPage: PropTypes.number,
    services: PropTypes.array.isRequired
  },

  getDefaultProps () {
    return {
      servicesPerPage: 10
    };
  },

  getInitialState () {
    return {
      paginate:true,
      allServicesRendered: false,
      currentPage: 1,
    };
  },

  renderAllServices (services = this.props.services) {
    return (
      <ul className="services-list">
        {services.map((service, idx) => {
          return (
            <li key={service+idx}>{service}</li>
          );
        })}
      </ul>
    );
  },

  handleClick (e) {
    this.setState({paginate:false});
    // const thisPage = this.state.currentPage + 1;
    // const isLastPage = (thisPage * this.props.servicesPerPage) > this.props.services.length;
     e.preventDefault();
    // this.setState({
    //   currentPage: thisPage,
    //   allServicesRendered: isLastPage
    // });
  },

  renderPaginatedServices () {
    const originalServices = this.props.services.slice(0); // copy array so as to not mutate props
    const services = originalServices.splice(0, (this.state.currentPage * this.props.servicesPerPage));
    return this.renderAllServices(services);
  },

  render () {
    if (!Array.isArray(this.props.services)) return null;
    if (this.props.services.length === 0) return null;

    const renderAll = !this.state.paginate || this.props.services.length <= 10;
    const classList = {
      'hg3-practice-services' : true,
      'desktop': !this.props.isMobile,
      'premium': this.props.isPremium
    };

    return (
      <section className={classNames(classList)}>
        <div className="hg3-practice-services-content">
          <h3>At {this.props.practiceName}, our providers specialize in:</h3>
          {renderAll ? this.renderAllServices() : this.renderPaginatedServices()}
          {this.state.paginate && (this.props.services.length < 10 || !this.state.allServicesRendered) &&
            <p>
              {this.props.isMobile ?
                <a onClick={this.handleClick} href="#">View More!</a> :
                <Button
                  className="view-more-button"
                  onClick={this.handleClick}
                  text="View More!"
                  type="primary" />
              }
            </p>
          }
        </div>
      </section>
    );
  }
});

export default HgServices;
