import React, { Component } from 'react';
import { Provider } from 'react-redux';

import './App.css';

import store from '../store';

import Entries from '../Entries';
import Form from '../Form';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <div className="col-1"></div>
          <Form />
          <div className="col-1"></div>
          <Entries/>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
