import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NoGroup from './components/NoGroup'
import reportWebVitals from './reportWebVitals';

import {Route} from 'wouter'

ReactDOM.render(
  <React.StrictMode>
    <Route path="/:group">
      {(params) => <App group={params.group}/>}
    </Route> 
    <Route exact path="/">
      <NoGroup />
    </Route>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
