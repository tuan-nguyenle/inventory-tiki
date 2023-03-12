import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../styles/inventorycontrol.scss";
import Nav from 'react-bootstrap/Nav';
const ProductManagement = () => {

    return (
        <div className="productmanagement_body">
            <div className="container-productmanagement">
                <div>
                    <h1 style={{ textAlign: "center" }} >Product Management</h1>
                </div>
                <div>
                    <Nav variant="tabs" defaultActiveKey="ShelfInformation">
                        <Nav.Item>
                            <NavLink to="ShelfInformation" href="ShelfInformation" eventKey="ShelfInformation" className={({ isActive }) => (isActive ? 'activelink2' : 'nonelink2')}>
                                Shelf Information
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink to="MoveShelf" className={({ isActive }) => (isActive ? 'activelink2' : 'nonelink2')}>
                                Move Shelf
                            </NavLink>
                        </Nav.Item>
                    </Nav>
                </div>
                <hr></hr>
                <div className="Main">
                    {<Outlet />}
                </div>
            </div>
        </div>
    )
}
export default ProductManagement;