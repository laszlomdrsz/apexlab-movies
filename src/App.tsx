import {CssBaseline} from '@mui/material';
import React from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Page from './components/Page/Page';

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <CssBaseline />
      <Page />
    </React.Fragment>
  );
}

export default App;
