import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as IBAPI from "../../../services/IBAPI";
import {
    FaSave,
} from "react-icons/fa";
const CheckIB = (props) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const miss = props.misssave; // data thiếu
    const contai = props.container; // pallet vs container
    const orderid = props.orderid;
    const data = { ...contai, id: orderid, miss };
    const handledata = [];
    const saveinbound = props.inbound;
    console.log(miss);
    const SaveReback = async () => {
        await saveinbound.forEach((ele) => {
            let products = {
                product_name: ele.product_name,
                category: ele.category,
                bar_code: ele.bar_code,
                quantity: ele.quantity,
                sku: ele.sku,
                unit: ele.unit,
                supplier_name: ele.supplier_name
            };
            handledata.push(products);
        })
        // set lại biến cho api
        const datainput = {
            name_pallet: contai.bowl,
            products: handledata
        };
        // gọi api ngay đây
        try {
            await IBAPI.submitIB(datainput, orderid);
            toast.success("Saving process has been completed"); // in thông báo
        } catch (error) {
            toast.error("Can't send. Please check again"); // in thông báo
            toggle();
        }

    }

    const SaveInbound = async () => {
        await saveinbound.forEach((ele) => {
            let products = {
                product_name: ele.product_name,
                category: ele.category,
                bar_code: ele.bar_code,
                quantity: ele.quantity,
                sku: ele.sku,
                unit: ele.unit,
                supplier_name: ele.supplier_name
            };
            handledata.push(products);
        })
        // set lại biến cho api
        const datainput = {
            name_pallet: contai.bowl,
            products: handledata
        };
        // gọi api ngay đây
        try {
            await IBAPI.submitIB(datainput, orderid);
            window.location.assign(`${window.location.protocol + '//' + window.location.host}`+"/MainIB/Notification");
            toast.success("Saving process has been completed"); // in thông báo
        } catch (error) {
            toast.error("Can't send. Please check again"); // in thông báo
            toggle();
        }
    }
    return (
        <div>
            <Button variant="primary" size="xl" onClick={() => toggle()}>
                <FaSave />&nbsp; Save
            </Button>
            <Modal isOpen={modal} toggle={() => toggle()} className="modal-add" size="xl">
                <ModalHeader toggle={() => toggle()} className="modal-header" >Save List Inbound</ModalHeader>
                <ModalBody className="modal-body">
                    {miss.length > 0 ?
                        <>
                            <form>
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 style={{ color: "red" }} className="card-title">Missing Product</h3>
                                        </div>
                                        <div className="card-body">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Product code</th>
                                                        <th>Product name</th>
                                                        <th>Supplier</th>
                                                        <th>Category</th>
                                                        <th>SKU</th>
                                                        <th>Unit</th>
                                                        <th>Missing Quantity</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {

                                                        miss.map((data, i = 0) => {
                                                            return (
                                                                <tr key={i++}>
                                                                    <td>{i + 1}</td>
                                                                    <td>{data.bar_code}</td>
                                                                    <td style={{ maxWidth: "200px", wordBreak: "break-all", whiteSpace: "pre-wrap" }}>{data.product_name}</td>
                                                                    <td>{data.supplier_name}</td>
                                                                    <td>{data.category}</td>
                                                                    <td>{data.sku}</td>
                                                                    <td>{data.unit}</td>
                                                                    <td style={{ color: "red" }}>{data.quantity}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </>
                        :
                        <h3 style={{ color: "#0000DD" }} >Are you sure ?</h3>
                    }


                </ModalBody>
                <ModalFooter>
                    {miss.length > 0 ? <Link to="/MainIB/Reback" state={data} ><button type="button" className="btn btn-dark" onClick={SaveReback}>Save and ReBack</button></Link> : ""}
                    {miss.length === 0 ? <Button variant="primary" onClick={SaveInbound}><i><FaSave /></i> &nbsp;
                        Save
                    </Button> : null}
                    {/* {<Button variant="primary" onClick={SaveInbound}><i><FaSave /></i> &nbsp;
                        Save

                    </Button>} */}
                    <Button variant="secondary" onClick={() => toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div >

    );
}
export default CheckIB;