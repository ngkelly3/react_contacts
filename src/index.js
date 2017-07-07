import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import './index.css';

ReactDOM.render(
  // sets up router to work with all other components importing next
  <BrowserRouter><App /></BrowserRouter>,
  document.getElementById('root')
);
