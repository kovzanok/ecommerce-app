import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import App from './App';
import store from './store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Provider store={store}>
        <App />
      </Provider>
    </MantineProvider>
  </React.StrictMode>,
);
