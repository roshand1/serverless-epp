import './_office-hours.less';
import React, { PropTypes } from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

const OfficeHours = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    officeHours: PropTypes.array.isRequired,
    acceptNewPatients: PropTypes.bool
  },

  renderOfficeHours () {
    let officeHoursList = this.props.officeHours.map((day,index) => {
      return !day.isClosed ? (
        <tr key={index}>
          <td className="officeHour"><div>{day.dayOfWeekName}</div></td><td><div>{day.startTime} - {day.endTime}</div></td>
        </tr>
      ) : (
        <tr key={index}>
          <td className="officeHour"><div>{day.dayOfWeekName}</div></td><td className="closedHour"><div> Closed</div></td>
        </tr>
      );
    });

    return (
      <table>
        <tbody>
          {officeHoursList}
        </tbody>
      </table>
    );
  },

  render () {
    if (!Array.isArray(this.props.officeHours) || this.props.officeHours.length === 0) {
      return <div/>;
    }
    return (
      <div className="hg3-office-hours">
        <h2>Office Hours</h2>
        {this.renderOfficeHours()}
        {this.props.acceptNewPatients?(<span><span className="hg3-i hg3-i-check checkap"></span> Accepting new patients</span>) :<span>Does not accept new patients</span>}
      </div>
    );
  }
});

export default OfficeHours;
