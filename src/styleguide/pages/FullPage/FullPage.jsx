import React from 'react';
import {Row, Col} from 'react-bootstrap';

import './full-page';

import ComponentA from '../../../components/ComponentA';
import ComponentB from '../../../components/ComponentB';
import ComponentC from '../../../components/ComponentC';

const FullPage = React.createClass({

  render() {

    return (
      <div>
        <Row>
          <Col md={12}>
            <h1>Full Page </h1>
            <p>This example represents full page multi-component organism (no <code>row</code> or <code>col</code> wrapping)</p>
          </Col>
        </Row>

        <ComponentA />
     
        <ComponentB />
      </div>
    );
  }
});

export default FullPage;