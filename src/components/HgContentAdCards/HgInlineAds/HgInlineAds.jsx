import React, { PropTypes } from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
var _html = require('./HgInlineAds.html');
var template = { _html: _html };


const HgInlineAds = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
  },

  render () {

    return (
      <div>
            <div dangerouslySetInnerHTML={template} />
    </div>);
  }
});

export default ContentNoAd;
