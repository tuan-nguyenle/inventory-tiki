import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../styles/inventorycontrol.scss";
import Button from 'react-bootstrap/Button';
import {
    FaPrint, FaCheck, FaTimes, FaSearch,
} from "react-icons/fa";
const ShelfManagement = () => {

    return (
        <div className="shelfmanagement_body">
            <div className="container-shelfmanagement">
                <div className="header">
                    <div>
                        <h1 style={{ textAlign: "center" }} >Shelf Management</h1>
                    </div>
                    <div style={{ float: "right" }}>
                        <Button variant="primary" size="lg">+ New Shelf</Button>
                    </div>
                </div>
                <hr></hr>
                <div>
                    <div className="search input-group col-md-6">
                        <input type="text" className="form-control" placeholder="Ex: A12B1" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <Button variant="primary"><FaSearch /></Button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body table-responsive p-0">
                                    <table className="table table-hover text-nowrap">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Area</th>
                                                <th>Shelf</th>
                                                <th style={{ width: "200px" }} >Extends</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>A</td>
                                                <td>A1A1</td>
                                                <td>
                                                    <Button variant="danger"><span style={{ paddingRight: "5px" }}><FaTimes /></span>Delete</Button>{' '}
                                                    <Button variant="warning"><span style={{ paddingRight: "5px" }}><FaPrint /></span>Print</Button>{' '}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td>A</td>
                                                <td>A1A2</td>
                                                <td>
                                                    <Button variant="danger"><span style={{ paddingRight: "5px" }}><FaTimes /></span>Delete</Button>{' '}
                                                    <Button variant="warning"><span style={{ paddingRight: "5px" }}><FaPrint /></span>Print</Button>{' '}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ShelfManagement;