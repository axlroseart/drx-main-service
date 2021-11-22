/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import { start, registerMicroApps } from 'qiankun'
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');

registerMicroApps(
  [
    {
      name: 'react-h5',
      entry: '//localhost:8000',
      container: '#root',
      activeRule: '/react-h5',
      props: {
        name: 'react-h5 test',
      },
    },
  ],
  {
    beforeLoad: (app) => {
      console.log('before load', app.name);
      return Promise.resolve(app.name);
    },
    beforeMount: (app) => {
      console.log('before mount', app.name);
      return Promise.resolve(app.name);
    },
  },
)

start();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
