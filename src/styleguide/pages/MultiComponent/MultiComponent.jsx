import React from 'react';
import {Row, Col, PageHeader} from 'react-bootstrap';

import './multi-component';

import ComponentA from '../../../components/ComponentA';
import ComponentB from '../../../components/ComponentB';
import ComponentC from '../../../components/ComponentC';
import Component1 from '../../../components/Component1';
import Component2 from '../../../components/Component2';
import Component3 from '../../../components/Component3';

const MultiComponent = React.createClass({

  render() {

    return (
      <div className="container component-container">
        <Row>
          <Col md={12}>
            <PageHeader>Multiple Component Page</PageHeader>
            <p>This example represents multiple components or variations of a single one</p>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <div data-spy="affix" data-offset-top="300" className="affix side-col">
              <ul>
                <li><a href="#1" title="" className="page-scroll">A</a></li>
                <li><a href="#2" title="" className="page-scroll">B</a></li>
                <li><a href="#3" title="" className="page-scroll">C</a></li>
                <li><a href="#4" title="" className="page-scroll">1</a></li>
                <li><a href="#5" title="" className="page-scroll">2</a></li>
                <li><a href="#6" title="" className="page-scroll">3</a></li>
              </ul>
            </div>
          </Col>
          <Col sm={9}>
            <Row>
              <Col md={12} className="component-col" id="1">
                <ComponentA />
              </Col>
            </Row>
            <Row>
              <Col md={12} className="component-col" id="2">
                <ComponentB />
              </Col>
            </Row>
            <Row>
              <Col md={12} className="component-col" id="3">
                <ComponentC />
              </Col>
            </Row>
            <Row>
              <Col md={12} className="component-col" id="4">
                <Component1 />
              </Col>
            </Row>
            <Row>
              <Col md={12} className="component-col" id="5">
                <Component2 />
              </Col>
            </Row>
            <Row>
              <Col md={12} className="component-col" id="6">
                <Component3 />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
});

export default MultiComponent;