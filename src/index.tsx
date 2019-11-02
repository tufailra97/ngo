import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Reset } from 'elements';
import store from 'store';
import App from './App';
import { light, dark } from './styles';

ReactDOM.render(
  <ThemeProvider theme={light}>
    <Provider store={store}>
      <Reset />
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
