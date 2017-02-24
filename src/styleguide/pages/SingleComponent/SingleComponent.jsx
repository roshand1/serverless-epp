import React from 'react';
import {Row, Col, PageHeader, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import './single-component';

import ComponentA from '../../../components/ComponentA';
import ComponentB from '../../../components/ComponentB';
import ComponentC from '../../../components/ComponentC';
import Component1 from '../../../components/Component1';
import Component2 from '../../../components/Component2';
import Component3 from '../../../components/Component3';

const SingleComponent = React.createClass({

  getInitialState() {
    return {selectedComponent : 'A'}
  },

  componentChangeHandler(id, event) {
    event.preventDefault();
    this.setState({selectedComponent : id})
  },

  getComponentToShow() {
    if(this.state.selectedComponent === 'A') {
        return(<ComponentA />);
    }

    if(this.state.selectedComponent === 'B') {
        return(<ComponentB />);
    }

    if(this.state.selectedComponent === 'C') {
        return(<ComponentC />);
    }

    if(this.state.selectedComponent === '1') {
        return(<Component1 />);
    }

    if(this.state.selectedComponent === '2') {
        return(<Component2 />);
    }

    if(this.state.selectedComponent === '3') {
        return(<Component3 />);
    }
  },

  getActiveClass(selectedComponent) {
    if(this.state.selectedComponent === selectedComponent ) {
      return 'active';
    } else {
      return '';
    }
  },

  render() {

    let ChosenComponent = this.getComponentToShow();

    return (

      <div className="container component-container">
        <Row>
          <Col md={12}>
            
            <PageHeader>Single Component Page</PageHeader>
            <p>Info</p>
            
            <div className="well">
              <Nav bsStyle="pills" justified>
                {['A','B','C'].map(item => (
                  <NavItem
                    className={this.getActiveClass(item)}
                    onClick={this.componentChangeHandler.bind(this,item)}
                    title={item}
                    key={item}>
                      {item}
                    </NavItem>
                ))}

                <NavDropdown title="Sub-Compoents" id="sub-component-dropdown">
                  {['1','2','3'].map(item => (
                  <MenuItem
                    className={this.getActiveClass(item)}
                    onClick={this.componentChangeHandler.bind(this,item)}
                    title={item}
                    key={item}>
                      {item}
                    </MenuItem>
                ))}
                </NavDropdown>
              </Nav>
            </div>

          </Col>
        </Row>
        <Row>
          <Col md={12} className="component-col">
            {ChosenComponent}
          </Col>
        </Row>
      </div>
    );
  }
});

export default SingleComponent;