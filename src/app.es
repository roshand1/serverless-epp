// 
// Main entry point for client side code. Pass parameters to this script via data attributes 
// on the script tag.
//
// Params:
//   data-root-path: Path to the root of the styleguide. Must start and end with a /. 
//      default '/', e.g. '/some/other/path/'

import StyleGuide from '@hg/styleguide-kit';
import React from 'react';
import ReactDOM from 'react-dom';

import routes from './styleguide/routes';
import homePageMarkdown from '../README';

ReactDOM.render(

  <StyleGuide
    rootPath="/"
    routes={routes}
    homePageMarkdown={homePageMarkdown} />
, document.getElementById('app-container'));