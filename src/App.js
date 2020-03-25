import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Routes from './Routes';
import './App.css';


function App() {
  document.querySelector('body').setAttribute('style', `height: ${window.innerHeight}px`)
  return (
    <div className="App">
      <Router>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
