import React, {Component} from "react";

import './App.css';

import Main from "./components/MainComponent";
import {BrowserRouter as Router, Routes} from "react-router-dom";



import { Provider } from 'react-redux';
import { store } from './redux/configureStore';


class App extends Component {
  
  render() {

    
    return (
      <Provider store={store}>
      <Router>      
      <div className="App">
        
      <Main/>
      
      </div>
      </Router>
      </Provider>

    );
  }
}

export default App;
