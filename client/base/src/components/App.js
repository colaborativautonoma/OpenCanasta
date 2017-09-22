import React, { Component } from 'react';

import Router from '../Router';
import { initApp } from '../config/firebase';

import './styles.css';

class App extends Component {
  componentWillMount() {
    initApp();
  }

  render() {
    return (
      <div>
        <Router />
      </div>
    );
  }
}

export default App;
