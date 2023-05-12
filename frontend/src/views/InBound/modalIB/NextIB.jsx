import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import "../../../styles/inbound.scss"
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
    FaSave,
} from "react-icons/fa";
const NextIB = (props) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const miss = props.misssave;
    let pack = null;
    if (miss && miss.length > 0 && miss[0].package_code) {
        pack = miss[0].package_code;
    }
    // const handlemissing = props.handlemissing();
    const SaveInbound = () => {
        props.handlemissing();
        toggle();
    }
    return (
        <div >
            <button type="button" id="btnnhapnext" className="btn btn_next btn-block btn-danger btn-lg" onClick={() => toggle()} >{">>"}</button>
            <Modal isOpen={modal} toggle={() => toggle()} {...props.miss} className="modal-validate" size="xl">
                <ModalHeader toggle={() => toggle()} className="modal-header" >Missing products in package - {pack}</ModalHeader>
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
                                                    <th style={{ width: "10%" }}>Missing Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    miss && miss.length > 0 && miss.map((data, i = 0) => {
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
export default NextIB;