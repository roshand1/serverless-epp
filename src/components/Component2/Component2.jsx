import React from 'react';

import './component-2';

const ComponentB = React.createClass({

  render() {
    return (
      <div className="component component-2">
        I am component
        <h1>2</h1>
      </div>
    );
  }
  
});

export default ComponentB;