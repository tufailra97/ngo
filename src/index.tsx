import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from 'store';
import { ThemeProvider } from 'styled-components';
import { Reset } from 'elements';

const theme = {
  bg: 'red'
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Reset />
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
