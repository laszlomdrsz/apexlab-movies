import {CssBaseline} from '@mui/material';
import React, {useEffect} from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Page from './components/Page/Page';

function App() {
  useEffect(() => {
    document.title = 'Apexlab Movies';
  }, []);

  return (
    <React.Fragment>
      <ToastContainer />
      <CssBaseline />
      <Page />
    </React.Fragment>
  );
}

export default App;
