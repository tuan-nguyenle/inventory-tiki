import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.scss';
import Login from '../views/Account/Login';
import MainOB from '../components/Mainpage/MainOB';
import Reback from '../views/InBound/Reback';
import Notification from '../views/Outbound/Notification.jsx'
import OutboundList from '../views/Outbound/OutboundList';
import User from '../views/InBound/User';
import Home from '../components/Home';
// import number from './components/number';
// import LogOut from '../components/LogOut';
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import "../styles/nav.scss";
import ConfirmationInbound from '../views/InBound/ConfirmationInbound';
import Accountmanagement from '../views/InBound/Accountmanagement';
import InputExcel from '../views/InputExcel';
import PrintPalletOB from '../views/Outbound/PrintPalletOB';

const NavIB = () => {
    return (
        <>
            {/* <React.StrictMode> */}
            < BrowserRouter >
                <Routes>
                    <Route path="/" element={<MainOB />} >
                        <Route path="InputExcel" exact element={<InputExcel />} />
                        <Route index element={<Home />} />
                        <Route path="MainOB" exact element={<Home />} />
                        <Route path="MainOB/User" exact element={<User />} />
                        <Route path='MainOB/Home' element={<Home />} />
                        <Route path='MainOB/Notification' element={<Notification />} />
                        <Route path='MainOB/OutboundList' element={<OutboundList />} />
                        <Route path='MainOB/ConfirmationInbound' element={<ConfirmationInbound />} />
                        <Route path='MainOB/Accountmanagement' element={<Accountmanagement />} />
                        {/* <Route path='MainIB/Reback' element={<Reback />} /> */}
                        <Route path='MainOB/PrintPalletOB' element={<PrintPalletOB />} />
                    </Route>
                    {/* <Route path='/LogOut' element={<LogOut />} /> */}
                </Routes>
            </BrowserRouter >
            {/* </React.StrictMode> */}
        </>
    );
};
export default NavIB;