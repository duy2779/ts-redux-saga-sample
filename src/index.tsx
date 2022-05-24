import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';
import { CustomRouter } from 'components/Common';
import customHistory from 'utils/history';
const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <CustomRouter history={customHistory}>
      <CssBaseline />
      <App />
    </CustomRouter>
  </Provider>
);
