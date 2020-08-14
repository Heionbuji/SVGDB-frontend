import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root';
import { GlobalStyle } from './styles/globalStyles';
import './i18n';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);
