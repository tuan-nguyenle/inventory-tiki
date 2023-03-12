import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.scss';
import Login from '../views/Account/Login';
import MainIC from '../components/Mainpage/MainIC';
import User from '../views/InBound/User';
import Home from '../components/Home';
import LogOut from '../components/LogOut';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/nav.scss";
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import Accountmanagement from '../views/InBound/Accountmanagement';
import ProductManagement from '../views/InventoryControl/ProductManagement';
import ShelfInformation from '../views/InventoryControl/productdetail/ShelfInformation';
import MoveShelf from '../views/InventoryControl/productdetail/MoveShelf';
import ShelfManagement from '../views/InventoryControl/ShelfManagement';
const NavIC = () => {
    return (
        <>
            {/* <React.StrictMode> */}
            < BrowserRouter >
                <Routes>
                    <Route path="/" exact element={<Login />} />
                    <Route path="MainIC" element={<MainIC />} >
                        <Route index element={<Home />} />
                        <Route path="User" exact element={<User />} />
                        <Route path='Home' element={<Home />} />
                        <Route path='Accountmanagement' element={<Accountmanagement />} />

                        <Route path='ProductManagement' element={<ProductManagement />}>
                            <Route index element={<ShelfInformation />} />
                            <Route path='ShelfInformation' element={<ShelfInformation />} />
                            <Route path='MoveShelf' element={<MoveShelf />} />
                        </Route>

                        <Route path='ShelfManagement' element={<ShelfManagement />}>
                        </Route>


                    </Route>
                    <Route path='/LogOut' element={<LogOut />} />
                </Routes>
            </BrowserRouter >
            {/* </React.StrictMode> */}
        </>
    );
};
export default NavIC;
