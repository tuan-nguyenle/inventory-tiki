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
import LogOut from '../components/LogOut';
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
const NavIB = () => {
    return (
        <>
            {/* <React.StrictMode> */}
            < BrowserRouter >
                <Routes>
                    <Route path="/" exact element={<Login />} />
                    <Route path="MainIB" element={<MainIB />} >
                        <Route index element={<Home />} />
                        <Route path="User" exact element={<User />} />
                        <Route path='Home' element={<Home />} />
                        <Route path='Notification' element={<Notification />} />
                        <Route path='InboundList' element={<InboundList />} />
                        <Route path='ConfirmationInbound' element={<ConfirmationInbound />} />
                        <Route path='Accountmanagement' element={<Accountmanagement />} />
                        <Route path='Reback' element={<Reback />} />
                        <Route path='PrintBowl' element={<PrintBowl />} />
                    </Route>
                    <Route path='/LogOut' element={<LogOut />} />
                </Routes>
            </BrowserRouter >
            {/* </React.StrictMode> */}
        </>
    );
};
export default NavIB;
