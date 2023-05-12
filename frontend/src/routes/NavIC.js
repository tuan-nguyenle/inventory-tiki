import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.scss';
import Login from '../views/Account/Login';
import MainIC from '../components/Mainpage/MainIC';
import User from '../views/InBound/User';
import Home from '../components/Home';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/nav.scss";
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import Accountmanagement from '../views/InBound/Accountmanagement';
import Storage from '../views/InventoryControl/Storage';
import ProductManagement from '../views/InventoryControl/ProductManagement';
import ShelfInformation from '../views/InventoryControl/productdetail/ShelfInformation';
import MoveShelf from '../views/InventoryControl/productdetail/MoveShelf';
import ShelfManagement from '../views/InventoryControl/ShelfManagement';
import ProductDetail from '../views/InventoryControl/productdetail/ProductDetail';
import DefectiveP from '../views/InventoryControl/DefectiveP';
import Statistics from '../views/InventoryControl/Statistics';
const NavIC = () => {
    return (
        <>
            {/* <React.StrictMode> */}
            < BrowserRouter >
                <Routes>
                    <Route path="/" element={<MainIC />} >
                        <Route index element={<Home />} />
                        <Route path="User" exact element={<User />} />
                        <Route path='MainIC/Home' element={<Home />} />
                        <Route path='MainIC/Accountmanagement' element={<Accountmanagement />} />
                        <Route path='MainIC/Storage' element={<Storage />} />

                        <Route path='MainIC/ProductManagement' element={<ProductManagement />}>
                            <Route index element={<ProductDetail />} />
                            <Route path='ProductDetail' element={<ProductDetail />} />
                            <Route path='ShelfInformation' element={<ShelfInformation />} />
                            <Route path='MoveShelf' element={<MoveShelf />} />
                        </Route>

                        <Route path='MainIC/ShelfManagement' element={<ShelfManagement />} />
                        <Route path='MainIC/DefectiveProduct' element={<DefectiveP />} />
                        <Route path='MainIC/Statistics' element={<Statistics />} />
                    </Route>
                </Routes>
            </BrowserRouter >
            {/* </React.StrictMode> */}
        </>
    );
};
export default NavIC;
