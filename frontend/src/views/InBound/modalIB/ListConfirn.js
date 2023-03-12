import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
    FaSave,
} from "react-icons/fa";
const ListConfirn = (props) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const SaveInbound = () => {
        toast.success("Đã Save"); // in thông báo
    }
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
                                            <th>Category</th>
                                            <th>Quantity</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>8938510904063</td>
                                            <td>Bộ trục ròng rọc</td>
                                            <td>Linh kiện</td>
                                            <td>5</td>
                                            <td>08/03/2023</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>8938510904063</td>
                                            <td>Bộ trục ròng rọc</td>
                                            <td>Linh kiện</td>
                                            <td>5</td>
                                            <td>08/03/2023</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>8938510904063</td>
                                            <td>Bộ trục ròng rọc</td>
                                            <td>Linh kiện</td>
                                            <td>5</td>
                                            <td>08/03/2023</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>8938510904063</td>
                                            <td>Bộ trục ròng rọc</td>
                                            <td>Linh kiện</td>
                                            <td>5</td>
                                            <td>08/03/2023</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>8938510904063</td>
                                            <td>Bộ trục ròng rọc</td>
                                            <td>Linh kiện</td>
                                            <td>5</td>
                                            <td>08/03/2023</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>8938510904063</td>
                                            <td>Bộ trục ròng rọc</td>
                                            <td>Linh kiện</td>
                                            <td>5</td>
                                            <td>08/03/2023</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>8938510904063</td>
                                            <td>Bộ trục ròng rọc</td>
                                            <td>Linh kiện</td>
                                            <td>5</td>
                                            <td>08/03/2023</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>8938510904063</td>
                                            <td>Bộ trục ròng rọc</td>
                                            <td>Linh kiện</td>
                                            <td>5</td>
                                            <td>08/03/2023</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>8938510904063</td>
                                            <td>Bộ trục ròng rọc</td>
                                            <td>Linh kiện</td>
                                            <td>5</td>
                                            <td>08/03/2023</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>8938510904063</td>
                                            <td>Bộ trục ròng rọc</td>
                                            <td>Linh kiện</td>
                                            <td>5</td>
                                            <td>08/03/2023</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>8938510904063</td>
                                            <td>Bộ trục ròng rọc</td>
                                            <td>Linh kiện</td>
                                            <td>5</td>
                                            <td>08/03/2023</td>
                                        </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>8938510904063</td>
                                            <td>Bộ trục ròng rọc</td>
                                            <td>Linh kiện</td>
                                            <td>5</td>
                                            <td>08/03/2023</td>
                                        </tr>
                                        {/* {

                                            data && data.length > 0 && data.map((data, i) => {
                                                return (

                                                    <tr key={data.id}>
                                                        <td>{i + 1}</td>
                                                        <td>{data.productcode}</td>
                                                        <td>{data.productname}</td>
                                                        <td>{data.category}</td>
                                                        <td>{data.quantity}</td>
                                                        <td>{data.date}</td>
                                                    </tr>
                                                )
                                            })
                                        } */}
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