import React from 'react';

import './component-b';

const ComponentB = React.createClass({

  render() {
    return (
      <div className="component component-b">
        I am component
        <h1>B</h1>
      </div>
    );
  }
  
});

export default ComponentB;