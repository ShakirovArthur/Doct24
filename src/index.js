import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { configureStore } from '@reduxjs/toolkit'
import ReduxThunk from 'redux-thunk'
import { postsReducer } from './store/slice';
import { Provider } from 'react-redux';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({
  reducer: postsReducer,
  middleware: [ReduxThunk],
  devTools: process.env.NODE_ENV !== 'production'
})
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);



