import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@modules/App';
import { Provider } from 'react-redux';
import { store } from '@app';
import muiTheme from '@theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { Action, StyledMaterialDesignContent } from '@ui';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SnackbarProvider
        maxSnack={5}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        preventDuplicate
        action={Action}
        Components={{
          success: StyledMaterialDesignContent,
          error: StyledMaterialDesignContent,
        }}
      >
        <Provider store={store}>
          <ThemeProvider theme={muiTheme}>
            <CssBaseline />

            <App />
          </ThemeProvider>
        </Provider>
      </SnackbarProvider>
    </LocalizationProvider>
  </React.StrictMode>,
);
