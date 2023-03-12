import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/images/logo.jpg"
import avatar from "../../assets/images/Avatar/Loc.jpg";
import {
    FaBell, FaEdit, FaBars, FaTh, FaSignOutAlt, FaUsers, FaProductHunt, FaBox
} from "react-icons/fa";

const MainIC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const menuItem = [
        {
            path: "Home",
            name: "Home",
            icon: <FaTh />,
            number: ""
        },
        // {
        //     path: "Notification",
        //     name: "Notification",
        //     icon: <FaBell />,
        //     number: "4"
        // },
        {
            path: "ProductManagement",
            name: "Product Management",
            icon: <FaProductHunt />,
            number: ""
        },
        {
            path: "ShelfManagement",
            name: "Shelf Management",
            icon: <FaBox />,
            number: ""
        },
        {
            path: "Accountmanagement",
            name: "Account management",
            icon: <FaUsers />,
            number: ""
        }
    ]
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
                        <NavLink to="User" key="avatar" className={({ isActive }) => (isActive ? 'avatar_hover' : 'avatar_hover')} >
                            <div className="img_avatar">
                                <img style={{ marginLeft: isOpen ? "" : "3px" }} src={avatar} className="avatar" alt="User Image" />
                            </div>
                            <div className="info">
                                <div style={{ display: isOpen ? "block" : "none" }} className="NameUser">Phạm Thị Chuyền</div>
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
                    <NavLink to="/Logout" key={-1} style={{ width: isOpen ? "199px" : "50px" }} className={({ isActive }) => (isActive ? 'nonelogout' : 'nonelogout')}>
                        <div className="icon_logout"><FaSignOutAlt /></div>
                        <div style={{ display: isOpen ? "block" : "none" }} className="link_text">Log Out</div>
                    </NavLink>
                </div>
                <main> {<Outlet />}</main>
            </div>
        </>
    );
};
export default MainIC;