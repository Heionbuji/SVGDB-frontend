import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root';
import * as serviceWorker from './serviceWorker';
import { GlobalStyle } from './styles/globalStyles';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);
serviceWorker.unregister();
