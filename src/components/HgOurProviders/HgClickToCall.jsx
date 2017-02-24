import React, { PropTypes } from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import classNames from 'classnames';
let HgButton = require('@hg/three-ui/HgButton');
const HgClickToCall = React.createClass({
  mixins: [PureRenderMixin],
  propTypes : {
    btnBlock: PropTypes.bool,
    btnSize: PropTypes.oneOf(['sm', 'lg', 'md', 'xs', 'xl']),
    btnType: PropTypes.oneOf(['default', 'primary', 'secondary', 'tertiary', 'trans']),
    children: PropTypes.any,
    className: PropTypes.string,
    hgoName: PropTypes.string,
    isButton: PropTypes.bool,
    onClick: PropTypes.func,
    phoneNumber: PropTypes.string
  },
  getDefaultProps () {
    return {
      btnBlock: false,
      btnSize: 'lg',
      btnType: 'secondary',
      hgoName: 'phone-number',
      onClick: () => {},
      isButton: false
    };
  },
  cleanPhoneNumber (phoneStr) {
    if (typeof phoneStr === 'string') {
      return phoneStr.replace(/^1|[^0-9]/g, '');
    }
    return phoneStr;
  },
  renderAsButton () {
    // const HgButton = require('@hg/three-ui/HgButton/HgButton');
    return (
      <HgButton
        block={this.props.btnBlock}
        className={classNames('hg-track', this.props.className)}
        href={`tel:${this.cleanPhoneNumber(this.props.phoneNumber)}`}
        data-hgoname={this.props.hgoName}
        data-linkvars={`hg.ClickToCallNumber=${this.cleanPhoneNumber(this.props.phoneNumber)}`}
        onClick={this.props.onClick}
        size={this.props.btnSize}
        text={this.props.phoneNumber}
        type={this.props.btnType}>
        { this.props.children ? this.props.children : null }
      </HgButton>
    );
  },
  renderAsLink () {
    return (
      <a
        className={classNames('hg-track', this.props.className)}
        href={`tel:${this.cleanPhoneNumber(this.props.phoneNumber)}`}
        data-hgoname={this.props.hgoName}
        data-linkvars={`hg.ClickToCallNumber=${this.cleanPhoneNumber(this.props.phoneNumber)}`}
        onClick={this.props.onClick}
        title={`Call: ${this.props.phoneNumber}`} >
        { this.props.children ? this.props.children : this.props.phoneNumber }
      </a>
    );
  },
  render () {
    return this.props.isButton ? this.renderAsButton() : this.renderAsLink();
  }
});
export default HgClickToCall;