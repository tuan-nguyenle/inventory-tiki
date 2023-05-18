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
import Error from './views/Error';
import Login from './views/Account/Login';
import jwt_decode from "jwt-decode";
const root = ReactDOM.createRoot(document.getElementById('root'));
const getuser = JSON.parse(sessionStorage.getItem('user'));
let session = null;
if (getuser) {
  // session = jwt_decode(getuser);
  session = getuser;
}
root.render(
  <>
    {!getuser && !session && <Login />}
    {session && session.departments && session.roles &&
      session.departments.some(dept => dept.description === "inbound") &&
      session.roles.some(role => role.description === "manager") &&
      <NavIB />}
    {session && session.departments && session.roles &&
      session.departments.some(dept => dept.description === "inventory-control") &&
      session.roles.some(role => role.description === "manager") &&
      <NavIC />}
    {session && session.departments && session.roles &&
      session.departments.some(dept => dept.description === "outbound") &&
      session.roles.some(role => role.description === "manager") &&
      <NavOB />}

    {/* <NavOB /> */}

    {/* <Error /> */}
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


    // {/* // OB-MANAGERMENT */}
    // {getuser && session && session.Department && session.Department.some(dept => dept.description === 'outbound') && session.Role && session.Role.some(role => role.description === 'manager')
    //   && <NavOB />}
    // {/* // IB-MANAGERMENT */}
    // {getuser && session && session.Department && session.Department.some(dept => dept.description === 'inbound') && session.Role && session.Role.some(role => role.description === 'manager')
    //   && <NavIB />}
    // {/* // IC-MANAGERMENT */}
    // {getuser && session && session.Department && session.Department.some(dept => dept.description === 'inventory-control') && session.Role && session.Role.some(role => role.description === 'manager')
    //   && <NavIC />}