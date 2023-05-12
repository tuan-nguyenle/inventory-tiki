import React, { useState, useEffect } from "react";
import Barcode from 'react-barcode';
import { Button } from "react-bootstrap";
import {
    FaPrint, FaCheck, FaTimes, FaPlus
} from "react-icons/fa";
import Addpallet from "./modalIB/Addpallet";
import * as IBAPI from "../../services/IBAPI";
const PrintBowl = () => {
    const [barcode, setBarcode] = useState("");
    const [crebarcode, setCrebarcode] = useState("");
    const [listpallet, setlistPallet] = useState(null);
    const [listpalletIB, setListpalletIB] = useState(null);

    const handlerchange = (e) => {
        setBarcode(e.target.value);
    }
    const create = barcode;
    const createbarcode = (e) => {
        e.preventDefault();
        setCrebarcode(barcode);
        setBarcode("")
    }
    const fetchPalletList = async () => {
        try {
            let list = await IBAPI.getallpallets();
            setlistPallet(list);
        } catch (error) {
            setlistPallet(null);
        }
    };
    useEffect(() => {
        (async () => {
            try {
                let list = await IBAPI.getallpallets();
                setlistPallet(list);
            } catch (error) {
                setlistPallet(null);
            }
        })();
    }, [])
    useEffect(() => {
        if (listpallet && listpallet.length > 0) {
            const listPalletIB = listpallet.filter((IB) => IB.area === "Inbound");
            setListpalletIB(listPalletIB);
        }
    }, [listpallet])

    return (
        <div className="Printbowl_body">
            <div>
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
                                    {<Addpallet fetchPalletList={fetchPalletList} />}
                                </div>
                            </div>
                            <hr></hr>
                            <form style={{ maxHeight: "70vh", overflow: "auto" }} className="form-printbowl">
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
                                                                    <th>Pallet Code</th>
                                                                    <th>Area</th>
                                                                    <th>Pallet Type</th>
                                                                    <th>Weight(kg)</th>
                                                                    <th>Extends</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {listpalletIB && listpalletIB.length > 0 && listpalletIB.map((data, i) => {
                                                                    return (
                                                                        <tr key={data._id} >
                                                                            <td>{i + 1}</td>
                                                                            <td>{data.name_pallet}</td>
                                                                            <td>{data.area}</td>
                                                                            <td>{data.type}</td>
                                                                            <td>{data.weight}</td>
                                                                            <td style={{ maxWidth: "100px", wordBreak: "break-all", whiteSpace: "pre-wrap" }}>
                                                                                <Button variant="warning"><span style={{ paddingRight: "5px" }}><FaPrint /></span>Print</Button>{' '}
                                                                                <Button variant="danger"><span style={{ paddingRight: "5px" }}><FaTimes /></span>Delete</Button>{' '}
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })}
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