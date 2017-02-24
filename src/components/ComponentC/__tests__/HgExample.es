import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import HgExample from '../';

describe("HgExample", function() {

  describe("with no props", function() {

    let output;

    beforeEach(() => {
      const renderer = ReactTestUtils.createRenderer();
      renderer.render((
        <HgExample />
      ));
      output = renderer.getRenderOutput();
    });

    it("renders a div", function() {   
      expect(output.type).toBe('div');
    });

    it("has the important 'component' class", function() {
      expect(output.props.className.split(" ")).toContain('component');
    });
  });
});