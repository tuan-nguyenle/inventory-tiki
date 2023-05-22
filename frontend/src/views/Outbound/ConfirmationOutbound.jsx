import { React, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import ListConfirn from "./modalIB/ListConfirn";
import * as IBAPI from "../../services/IBAPI";
import { toast } from 'react-toastify';
import {
    FaPrint, FaCheck, FaTimes
} from "react-icons/fa";
const ConfirmationOutbound = () => {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = day + "/" + month + "/" + year;

    const [listpallet, setlistPallet] = useState(null);
    const [palletProduct, setPalletProduct] = useState(null);
    const uploadStatus = async (id) => {
        try {
            let res = await IBAPI.uploadstatus(id);
            try {
                let list = await IBAPI.getallpallets();
                setlistPallet(list);
            } catch (error) {
                setlistPallet(null);
            }
            toast.success("Update success"); // in thông báo
        } catch (error) {
            toast.error("Update Fail"); // in thông báo
        }
    }
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
            const haveproduct = listpallet.filter((IB) => IB.products.length > 0);
            setPalletProduct(haveproduct);
        }
    }, [listpallet])
    console.log(palletProduct);
    return (
        <div className=" body_validatelistIB">
            <div className="container_validateIB">
                <h1 style={{ textAlign: "center" }} >Confirmation Outbound</h1>
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
                                        <th>List Products</th>
                                        <th>Pallet</th>
                                        <th>Date</th>
                                        <th>Extends</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {palletProduct && palletProduct.length > 0 && palletProduct.map((data, i) => {
                                        return (
                                            <tr key={data._id} >
                                                <td>{i + 1}</td>
                                                <td><ListConfirn product={data.products} /></td>
                                                <td>{data.name_pallet}</td>
                                                <td>{data.updatedAt}</td>
                                                {data.validate === true ? <td style={{ width: "300px" }}>
                                                    <Button variant="warning"><span style={{ paddingRight: "5px" }}><FaPrint /></span>Print</Button>
                                                    <Button variant="danger"><span style={{ paddingRight: "5px" }}><FaTimes /></span>Delete</Button>
                                                </td> : <td style={{ width: "300px" }}>
                                                    <Button variant="success" onClick={() => uploadStatus(data._id)} ><span style={{ paddingRight: "5px" }}><FaCheck /></span>Validate</Button>
                                                    <Button variant="warning"><span style={{ paddingRight: "5px" }}><FaPrint /></span>Print</Button>
                                                    <Button variant="danger"><span style={{ paddingRight: "5px" }}><FaTimes /></span>Delete</Button>
                                                </td>}

                                            </tr>
                                        )
                                    })}
                                    {/* <tr>
                                        <td>1</td>
                                        <td><ListConfirn /></td>
                                        <td>IB0001</td>
                                        <td>17/02/2023</td>
                                        <td style={{ width: "300px" }}>

                                            <Button variant="warning"><span style={{ paddingRight: "5px" }}><FaPrint /></span>Print</Button>{' '}
                                            <Button variant="danger"><span style={{ paddingRight: "5px" }}><FaTimes /></span>Delete</Button>{' '}
                                        </td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};
export default ConfirmationOutbound;
