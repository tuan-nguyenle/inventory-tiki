import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
    FaSave,
} from "react-icons/fa";
const ListConfirn = (props) => {
    const listproduct = props.product;
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return (
        <div>
            {<p style={{ cursor: "pointer", color: "blue", textDecorationLine: "underline" }} onClick={() => toggle()}> List Products...</p>}
            <Modal isOpen={modal} toggle={() => toggle()} size="xl" {...props} className="modal-validate">
                <ModalHeader toggle={() => toggle()} className="modal-header" >Save List Inbound</ModalHeader>
                <ModalBody className="modal-body">
                    <div >
                        <div className="card">
                            <div className="card-body table-responsive p-0">
                                <table className="table table-hover text-nowrap">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Product code</th>
                                            <th>Product name</th>
                                            <th>Supplier</th>
                                            <th>Category</th>
                                            <th>Quantity</th>
                                            <th>SKU</th>
                                            <th>Unit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {

                                            listproduct && listproduct.length > 0 && listproduct.map((data, i) => {
                                                return (
                                                    <tr key={data._id}>
                                                        <td>{i + 1}</td>
                                                        <td>{data.bar_code}</td>
                                                        <td style={{ maxWidth: "200px", wordBreak: "break-all", whiteSpace: "pre-wrap" }}>{data.product_name}</td>
                                                        <td>{data.supplier_name}</td>
                                                        <td>{data.category}</td>
                                                        <td>{data.quantity}</td>
                                                        <td>{data.sku}</td>
                                                        <td>{data.unit}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={() => toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>

        </div >
    );
}
export default ListConfirn;