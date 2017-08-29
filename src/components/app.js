import React from 'react';
import NavBar from './nav_bar';

const App = ({children}) => (
  <div>
    <NavBar />
    <main role="main">
      <div>{children}</div>
    </main>
  </div>
);

export default App;