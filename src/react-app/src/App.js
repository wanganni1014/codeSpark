import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Index from './Index/Index';

function App() {
  return (
    <Router>
      <Route path='/' component={Index}/>
    </Router>  
  );
}

export default App;
