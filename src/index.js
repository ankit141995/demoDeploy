import React from 'react';
import ReactDOM from 'react-dom';

import App from './App'
import {BrowserRouter} from 'react-router-dom'
import axios from "axios"
 axios.defaults.baseURL = 'https://garniche-backend.herokuapp.com/'


ReactDOM.render(
  <BrowserRouter>
  
    <App />
  
   </BrowserRouter>
  ,document.getElementById('root')
);

