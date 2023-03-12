import React from "react";
import Button from 'react-bootstrap/Button';
import ListConfirn from "./modalIB/ListConfirn";
import {
    FaPrint, FaCheck, FaTimes
} from "react-icons/fa";
const ConfirmationInbound = () => {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = day + "/" + month + "/" + year;
    return (
        <div className=" body_validatelistIB">
            <div className="container_validateIB">
                <h1 style={{ textAlign: "center" }} >Confirmation Inbound</h1>
            </div>
            <hr></hr>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body table-responsive p-0">
                            <table className="table table-hover text-nowrap">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>List</th>
                                        <th>Bowl</th>
                                        <th>Code Container</th>
                                        <th>Date</th>
                                        <th style={{ width: "300px" }}>Extends</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td><ListConfirn /></td>
                                        {/* <td><a href="adas">List...</a></td> */}
                                        <td>IB0001</td>
                                        <td>A4253855544</td>
                                        <td>17/02/2023</td>
                                        <td>
                                            <Button variant="success"><span style={{ paddingRight: "5px" }}><FaCheck /></span>Validate</Button>{' '}
                                            <Button variant="warning"><span style={{ paddingRight: "5px" }}><FaPrint /></span>Print</Button>{' '}
                                            <Button variant="danger"><span style={{ paddingRight: "5px" }}><FaTimes /></span>Delete</Button>{' '}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td><ListConfirn /></td>
                                        <td>IB0002</td>
                                        <td>435467657532</td>
                                        <td>17/02/2023</td>
                                        <td>
                                            <Button variant="success"><span style={{ paddingRight: "5px" }}><FaCheck /></span>Validate</Button>{' '}
                                            <Button variant="warning"><span style={{ paddingRight: "5px" }}><FaPrint /></span>Print</Button>{' '}
                                            <Button variant="danger"><span style={{ paddingRight: "5px" }}><FaTimes /></span>Delete</Button>{' '}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td><ListConfirn /></td>
                                        <td>IB0001</td>
                                        <td>435467657532aabb</td>
                                        <td>17/02/2023</td>
                                        <td>
                                            <Button variant="warning"><span style={{ paddingRight: "5px" }}><FaPrint /></span>Print</Button>{' '}
                                        </td>
                                    </tr>

                                    {/* {

                                        data && data.length > 0 && data.map((data, i) => {
                                            return (

                                                <tr key={data.id}>
                                                    <td>{i + 1}</td>
                                                    <td>{data.productcode}</td>
                                                    <td>{data.date}</td>
                                                    <td>1</td>
                                                </tr>
                                            )
                                        })
                                    } */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};
export default ConfirmationInbound;
