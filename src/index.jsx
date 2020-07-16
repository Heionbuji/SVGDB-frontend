import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './Root';
import { GlobalStyle } from './styles/globalStyles';
import './i18n';

ReactDOM.render(
  <Suspense fallback="lol">
    <React.StrictMode>
      <GlobalStyle />
      <Root />
    </React.StrictMode>
  </Suspense>,
  document.getElementById('root'),
);
