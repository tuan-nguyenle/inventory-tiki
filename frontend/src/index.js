import React from 'react';
import ReactDOM from 'react-dom/client';
import io from 'socket.io-client';
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

let Role = null;
let Department = null;
let session = null;

if (getuser) {
  const socket = io.connect('http://localhost:8081');
  socket.on("notify", (data) => {
    alert(data.msg);
    console.log(data.msg);
  })
  session = jwt_decode(getuser);
  Role = session.Role[0].description;
  Department = session.Department[0].description;
}

root.render(
  <>
    {!getuser && !session && <Login />}
    {session && Department === "Inbound" && Role === "manager" && <NavIB />}
    {session && Department === "Inventory-control" && Role === "manager" && <NavIC />}
    {session && Department === "Outbound" && Role === "manager" && <NavOB />}

    {/* <NavOB /> */}

    {/* <Error /> */}
    < ToastContainer
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