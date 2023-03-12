// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { useState } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import logo from "../../assets/images/logo.jpg"
import avatar from "../../assets/images/Avatar/Loc.jpg";
import {
    FaBell, FaWarehouse, FaEdit, FaBars, FaUser, FaTh, FaSignOutAlt, FaBarcode, FaCheckDouble, FaUsers
} from "react-icons/fa";

const MainIB = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const menuItem = [
        {
            path: "Home",
            name: "Home",
            icon: <FaTh />,
            number: ""
        },
        {
            path: "Notification",
            name: "Notification",
            icon: <FaBell />,
            number: "4"
        },
        {
            path: "InboundList",
            name: "Create Inbound List",
            icon: <FaWarehouse />,
            number: ""
        },
        {
            path: "Reback",
            name: "Create Reback",
            icon: <FaEdit />,
            number: ""
        },
        {
            path: "PrintBowl",
            name: "Print Bowl",
            icon: <FaBarcode />,
            number: ""
        },
        {
            path: "ConfirmationInbound",
            name: "Confirmation Inbound",
            icon: <FaCheckDouble />,
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
                                <div style={{ display: isOpen ? "block" : "none" }} className="NameUser">Nguyễn Thùy Linh</div>
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
            {/* <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link to="PrintInvoice" className="nav-link">Print invoice</Link>
                            <Link to="CheckInventory" className="nav-link">Check Inventory</Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet /> */}
        </>
    );
};
export default MainIB;