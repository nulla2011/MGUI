import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/index.css';
import App from './App';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '@mui/material/styles';
import customTheme from './theme';
import CssBaseline from '@mui/material/CssBaseline';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </RecoilRoot>
);
