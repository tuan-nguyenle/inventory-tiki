import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import "../../../styles/inbound.scss";
import UpdateQuantity from "../productdetail/UpdateQuantity";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
    FaSave,
} from "react-icons/fa";
const Productinshelf = (props) => {
    const [edit, setEdit] = useState(false);
    const [modal, setModal] = useState(false);
    const [a, setA] = useState(null);
    const toggle = () => setModal(!modal);
    const miss = props.data;
    const products = miss['products'];
    const changeIconedit = (id) => {
        setEdit(!edit);
        setA(id)
    }
    const changechild = () => {
        setEdit(!edit)
        toast.success("Add Success"); // in thông báo
    }
    let shelve = null;
    if (miss, miss['shelf_code'].length > 0) {
        shelve = miss['shelf_code'];
    }
    // const handlemissing = props.handlemissing();
    const SaveInbound = () => {
        props.handlemissing();
        toggle();
    }
    return (
        <div >
            <Button variant="warning" onClick={() => toggle()}><span style={{ paddingRight: "5px" }}></span>Products</Button>
            <Modal isOpen={modal} toggle={() => toggle()} {...props.miss} className="modal-validate" size="xl">
                <ModalHeader toggle={() => toggle()} className="modal-header" >Missing products in package - {shelve}</ModalHeader>
                <ModalBody className="modal-body">
                    <>
                        <form>
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "5%" }}>STT</th>
                                                    <th>Product code</th>
                                                    <th>Product name</th>
                                                    <th>Supplier</th>
                                                    <th>Category</th>
                                                    <th>SKU</th>
                                                    <th>Unit</th>
                                                    <th style={{ width: "10%" }}>Quantity</th>
                                                    <th>Extends</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    products && products.length > 0 && products.map((data, i = 0) => {
                                                        return (
                                                            <tr key={i++}>
                                                                <td>{i + 1}</td>
                                                                <td>{data.bar_code}</td>
                                                                <td style={{ maxWidth: "200px", wordBreak: "break-all", whiteSpace: "pre-wrap" }}>{data.product_name}</td>
                                                                <td>{data.supplier_name}</td>
                                                                <td>{data.category}</td>
                                                                <td>{data.sku}</td>
                                                                <td>{data.unit}</td>
                                                                <td >{data.quantity}</td>
                                                                <td>
                                                                    {edit & data._id == a ?
                                                                        <>
                                                                            {/* {data.id === item.id && */}
                                                                            <div style={{ padding: "0px", }}>
                                                                                < div style={{ display: "flex" }}>
                                                                                    <div style={{ paddingRight: "5px", paddingLeft: "0px" }} className="col-sm-7 col-md-7">
                                                                                        <input type="text" className="form-control" value={data.quantity} />
                                                                                    </div>
                                                                                    <div style={{ paddingLeft: "1px" }} className="col-sm-5 col-md-5">
                                                                                        {/* <Button variant="success" onClick={changeIconedit}>Save</Button> */}
                                                                                        <UpdateQuantity changechild={changechild} />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            {/* } */}
                                                                        </>
                                                                        :
                                                                        <div>
                                                                            <Button style={{ marginRight: "5px" }} variant="warning" onClick={() => changeIconedit(data._id)}>Quantity</Button>
                                                                            <Button variant="danger">Defect</Button>
                                                                        </div>

                                                                    }
                                                                </td>
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
                </ModalBody>
                <ModalFooter>
                    <Button variant="primary" onClick={SaveInbound} ><i><FaSave /></i> &nbsp;
                        Save
                    </Button>
                    <Button variant="secondary" onClick={() => toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div >
    );
}
export default Productinshelf;