import React, { useState } from "react";
import Barcode from 'react-barcode';
import { Button } from "react-bootstrap";
import {
    FaPrint, FaCheck, FaTimes, FaPlus
} from "react-icons/fa";
import Addpallet from "./modalIB/Addpallet";
const PrintBowl = () => {
    const [barcode, setBarcode] = useState("");
    const [crebarcode, setCrebarcode] = useState("");
    const handlerchange = (e) => {
        setBarcode(e.target.value);
    }
    const create = barcode;
    const createbarcode = (e) => {
        e.preventDefault();
        // setCrebarcode("OB-" + barcode);
        setCrebarcode(barcode);
        setBarcode("")
    }

    return (
        <div className="Printbowl_body">
            <div className="header_print">
                <h1 style={{ textAlign: "center" }} >Pallet Management</h1>
            </div>
            <hr></hr>
            <div className="container_printbowl">
                <div>
                    <div className="card card-default">
                        <div className="card-body">
                            <form className="form-printbowl">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div>
                                                <h3>Print Pallet</h3>
                                            </div>
                                            <hr></hr>
                                            <div className="texrt col-md-11">
                                                <div className="form-group">
                                                    <input maxLength="" value={barcode} type="text" className="form-control" id="exampleInputEmail1" placeholder="Code-container" onChange={handlerchange} />
                                                </div>
                                            </div>
                                            <div style={{ padding: "0" }} className="col-md-1" >
                                                <Button onClick={createbarcode} variant="primary">Print</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card card-default">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="barcode" >
                                                            <Barcode value={crebarcode.length > 0 && crebarcode ? crebarcode : "000"} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div>
                    <p></p>
                </div>
                <div>
                    <div className="card card-default">
                        <div className="card-body">
                            <div className="header_print">
                                <div>
                                    <h3>Pallets </h3>
                                </div>
                                <div className="buttom_plus_pallet" >
                                    {<Addpallet />}
                                </div>
                            </div>
                            <hr></hr>
                            <form className="form-printbowl">
                                <div className="card card-default">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-12">
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
                                                                    <td></td>
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
                                                                    <td></td>
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
                                                                    <td></td>
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
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >

        </div >
    )
}
export default PrintBowl;   