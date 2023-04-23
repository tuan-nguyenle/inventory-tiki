import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.scss';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavIB from "./routes/NavIB";
import NavIC from './routes/NavIC';
import NavOB from './routes/NavOB';
import Login from './views/Account/Login';
const root = ReactDOM.createRoot(document.getElementById('root'));
const session = JSON.parse(sessionStorage.getItem('user'));
root.render(
  <>

    <NavIB />
    <NavIC />
    <NavOB />



    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
