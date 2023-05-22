import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.scss';
import MainIB from '../components/Mainpage/MainIB';
import 'react-toastify/dist/ReactToastify.css';
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import "../styles/nav.scss";
import InputExcel from '../views/InputExcel';
const Boss = () => {
    return (
        <>
            {/* <React.StrictMode> */}
            < BrowserRouter >
                <Routes>
                    <Route path="/" element={<MainIB />} >
                        <Route path="/" exact element={<InputExcel />} />
                    </Route>
                </Routes>
            </BrowserRouter >
            {/* </React.StrictMode> */}
        </>
    );
};
export default Boss;
