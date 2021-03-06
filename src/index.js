import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import authReducer from './store/reducers/auth';
import adminAuthReducer from './store/reducers/adminAuth';

// axios.defaults.baseURL = 'https://co527project.herokuapp.com/';
axios.defaults.baseURL = 'http://localhost:3000/';
// axios.defaults.baseURL = 'http://34.229.56.93:3000/';
// axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = true;
axios.defaults.headers.post['Access-Control-Allow-Credentials'] = true;

const rootReducer = combineReducers({
    auth: authReducer,
    adminAuth: adminAuthReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
  <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
