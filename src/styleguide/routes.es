// Every route should be an object with these attributes:
//
// path:      Route to page and top level jasmine test container name.
// component: The page component which will render the test page. The component will be 
//            lazy loaded using react-router-proxy if the webpack.config.js is configured
//            correctly.
// layout:    A page layout. Defaults to 'standard', other options are .... TBD!
// params:     Props to be passed to the above component when rendered
//
// Routes can be nested one layer deep inside a parent path for ease of navigation. The
// child routes have the same shape as above, the parent route has these attributes:
//
// path:      Route to page and top level jasmine test container name.
// subpaths:  The sub paths to be added to path.
//
// Eg: {
//   path: 'Comp', 
//   subpaths: [
//     {path: 'VersionA', component: Component, params: {type: 'A'}},
//     {path: 'VersionB', component: Component, params: {type: 'B'}},
//   ],
// }

import SingleComponent from 'react-router-proxy?name=styleguide-kit/routes/SingleComponent!./pages/SingleComponent';
import MultiComponent from 'react-router-proxy?name=styleguide-kit/routes/MultiComponent!./pages/MultiComponent';
import FullPage from 'react-router-proxy?name=styleguide-kit/routes/FullPage!./pages/FullPage';

const routes = [
  {path: 'Component', component: SingleComponent},
  {path: 'Components', component: MultiComponent, layout: 'someOtherLayout'},
  {
    path: 'Layouts',
    subpaths: [
      {path: 'A', component: FullPage, params: {type: 'A'}},
      {path: 'B', component: FullPage, params: {type: 'B'}},
      {path: 'C', component: FullPage, params: {type: 'C'}},
    ],
  },
]

export default routes;