import React from "react";
import { Menu } from 'antd';
import { Link, Outlet } from "react-router-dom";
import "../../styles/inventorycontrol.scss";
// import Nav from 'react-bootstrap/Nav';
const ProductManagement = () => {

    return (
        <div className="productmanagement_body">
            <div className="container-productmanagement">
                <div>
                    <h1 style={{ textAlign: "center" }} >Product Management</h1>
                </div>
                <div className="menu">
                    <Menu mode="horizontal" defaultSelectedKeys={"0"}>
                        <Menu.Item key="0"> <Link to="ProductDetail">Product Management</Link></Menu.Item >
                        <Menu.Item key="1"> <Link to="ShelfInformation">Shelf Information</Link></Menu.Item >
                        <Menu.Item key="2"> <Link to="MoveShelf">Move Shelf</Link></Menu.Item>
                    </Menu>
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