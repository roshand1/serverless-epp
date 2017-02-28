import './_hg-insurance.less';

import React, { PropTypes } from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import classNames from 'classnames';
import HgSectionTitle from '../HgSectionTitle';
import Button from '@hg/three-ui/HgButton';

const HgInsurance = React.createClass({

  //mixins: [PureRenderMixin],

  propTypes : {
    isMobile: PropTypes.bool,
    isPremium: PropTypes.bool,
    practiceName: PropTypes.string,
    paginate: PropTypes.bool,
    insurancePerPage: PropTypes.number,
    insurance: PropTypes.array
  },

  getDefaultProps () {
    return {
      paginate: true,
      insurancePerPage: 10
    };
  },

  getInitialState () {
    return {
      allInsuranceRendered: false,
      currentPage: 1,
      insuranceCount: Array.isArray(this.props.insurance) && this.props.insurance.length
    };
  },

  renderAllInsurance (insurance = this.props.insurance) {
    return (
      <ul className="insurance-list">
        {insurance.map((insurance, idx) => {
          return (
            <li key={insurance+idx}>{insurance}</li>
          );
        })}
      </ul>
    );
  },

  handleClick (e) {
    const thisPage = this.state.currentPage + 1;
    const isLastPage = (thisPage * this.props.insurancePerPage) > this.props.insurance.length;
    e.preventDefault();
    this.setState({
      currentPage: thisPage,
      allInsuranceRendered: isLastPage
    });
  },

  renderPaginatedInsurance () {
    const originalInsurance = this.props.insurance.slice(0); // copy array so as to not mutate props
    const insurance = originalInsurance.splice(0, (this.state.currentPage * this.props.insurancePerPage));
    return this.renderAllInsurance(insurance);
  },

  render () {
    if (!Array.isArray(this.props.insurance)) return null;
    if (this.props.insurance.length === 0) return null;

    const renderAll = !this.props.paginate || this.props.insurance.length <= 10;
    const classList = {
      'hg3-practice-insurance' : true,
      'desktop': !this.props.isMobile,
      'premium': this.props.isPremium
    };

    return (
      <section className="hg3-insurance">
      <div className={classNames(classList)}>
        <div className="hg3-practice-insurance-content">
          <h3>{this.props.practiceName} accepts {this.props.insurance.length} insurance carriers</h3>
          {renderAll ? this.renderAllInsurance() : this.renderPaginatedInsurance()}
          {this.props.insurance.length < 10 || !this.state.allInsuranceRendered &&
          <div>
              {this.props.isMobile ?
                <a onClick={this.handleClick} href="#">View More</a> :
                <Button
                  className="view-more-button"
                  onClick={this.handleClick}
                  text="View More"
                  type="primary" />
              }
      </div>
          }
        </div>
      </div>
      </section>
    );
  }
});

export default HgInsurance;
