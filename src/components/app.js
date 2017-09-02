import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NavBar from './nav_bar';
import HomePage from './home_page';
import AboutPage from './about_page';
import NoMatchPage from './no_match_page';

const App = ({children}) => (
  <div>
    <NavBar />
    <main role="main">
    <Switch>
      <Route exact path="/" component={HomePage} />

      <Route path="/about" component={AboutPage} />
      <Route component={NoMatchPage} />
    </Switch>
    </main>
  </div>
);

export default App;

// import React from 'react';
// import NavBar from './nav_bar';
//
// const App = ({children}) => (
//   <div>
//     <NavBar />
//     <main role="main">
//       <div>{children}</div>
//     </main>
//   </div>
// );
//
// export default App;
