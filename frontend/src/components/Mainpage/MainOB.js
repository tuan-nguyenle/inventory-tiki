import React, { useState } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import logo from "../../assets/images/logo.jpg"
import axios from "axios";
import avatar from "../../assets/images/Avatar/long.jpg";
import {
    FaBell, FaWarehouse, FaEdit, FaBars, FaUser, FaTh, FaSignOutAlt, FaBarcode, FaCheckDouble, FaUsers
} from "react-icons/fa";
const MainIB = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const menuItem = [
        {
            path: "MainOB/Home",
            name: "Home",
            icon: <FaTh />,
            number: ""
        },
        {
            path: "MainOB/Notification",
            name: "Notification",
            icon: <FaBell />,
            number: "1"
        },
        {
            path: "MainOB/OutboundList",
            name: "Create OutBound List",
            icon: <FaWarehouse />,
            number: ""
        },
        // {
        //     path: "MainIB/Reback",
        //     name: "Create Reback",
        //     icon: <FaEdit />,
        //     number: ""
        // },
        {
            path: "MainOB/PrintPalletOB",
            name: "Print Pallet",
            icon: <FaBarcode />,
            number: ""
        },
        {
            path: "MainOB/ConfirmationInbound",
            name: "Confirmation OutBound",
            icon: <FaCheckDouble />,
            number: ""
        },
        {
            path: "MainOB/Accountmanagement",
            name: "Account management",
            icon: <FaUsers />,
            number: ""
        }
    ]
    function handleLogout() {
        axios.post("http://localhost/api/auth/users/logout/");
        sessionStorage.removeItem('user');
        // window.location.reload();
        window.location.href = '/login';
    }
    return (
        <>
            <div className="container_sidebar">
                <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
                    <div className="top_section">
                        <img style={{ display: isOpen ? "block" : "none" }} className="logo" src={logo} alt="logo" />
                        <div style={{ marginLeft: isOpen ? "20px" : "-5px", marginTop: isOpen ? "0px" : "40px" }} className="bars">
                            <FaBars onClick={toggle} />
                        </div>
                    </div>
                    <div className="nav_avatar">
                        <NavLink to="MainOB/User" key="avatar" className={({ isActive }) => (isActive ? 'avatar_hover' : 'avatar_hover')} >
                            <div className="img_avatar">
                                <img style={{ marginLeft: isOpen ? "" : "3px" }} src={avatar} className="avatar" alt="User Image" />
                            </div>
                            <div className="info">
                                <div style={{ display: isOpen ? "block" : "none" }} className="NameUser">Lê Nguyễn Tuân</div>
                            </div>
                        </NavLink>
                    </div>

                    {
                        menuItem.map((item, index) => (
                            <NavLink to={item.path} key={index} className={({ isActive }) => (isActive ? 'activelink' : 'nonelink')}>
                                <div className="icon">{item.icon}</div>
                                <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                                <span style={{ left: isOpen ? "175px" : "30px" }} className=" badge number bad">{item.number}</span>
                            </NavLink>
                        ))
                    }
                    <NavLink to="#" key={-1} style={{ width: isOpen ? "199px" : "50px" }} className={({ isActive }) => (isActive ? 'nonelogout' : 'nonelogout')} onClick={handleLogout}>
                        <div className="icon_logout"><FaSignOutAlt /></div>
                        <div style={{ display: isOpen ? "block" : "none" }} className="link_text">Log Out</div>
                    </NavLink>
                </div>
                <main> {<Outlet />}</main>
            </div>
        </>
    );
};
export default MainIB;