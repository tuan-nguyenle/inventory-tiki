import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.scss';
import Login from '../views/Account/Login';
import MainIB from '../components/Mainpage/MainIB';
import InboundList from '../views/InBound/InboundList';
import Reback from '../views/InBound/Reback';
import Notification from '../views/InBound/Notification';
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
import PrintBowl from '../views/InBound/PrintBowl';
import InputReback from '../views/InBound/InputReback';
import Error from "../views/Error";
const NavIB = () => {
    return (
        <>
            {/* <React.StrictMode> */}
            < BrowserRouter >
                <Routes>
                    <Route path="/" element={<MainIB />} >
                        <Route index element={<Home />} />
                        <Route path="MainIB" exact element={<Home />} />
                        <Route path="MainIB/User" exact element={<User />} />
                        <Route path='MainIB/Home' element={<Home />} />
                        <Route path='MainIB/InputReback' element={<InputReback />} />
                        <Route path='MainIB/Notification' element={<Notification />} />
                        <Route path='MainIB/InboundList' element={<InboundList />} />
                        <Route path='MainIB/ConfirmationInbound' element={<ConfirmationInbound />} />
                        <Route path='MainIB/Accountmanagement' element={<Accountmanagement />} />
                        <Route path='MainIB/Reback' element={<Reback />} />
                        <Route path='MainIB/PrintBowl' element={<PrintBowl />} />
                        <Route path="*" element={<Error />} />
                    </Route>
                </Routes>
            </BrowserRouter >
            {/* </React.StrictMode> */}
        </>
    );
};
export default NavIB;
