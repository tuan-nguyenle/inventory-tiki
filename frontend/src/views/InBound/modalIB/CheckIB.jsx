import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
    FaSave,
} from "react-icons/fa";
const CheckIB = (props) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const miss = props.misssave;
    const contai = props.container;
    const data = { ...contai, miss };
    const saveinbound = props.inbound;
    const containerbow = props.container
    const SaveInbound = () => {
        console.log("data input", saveinbound);
        console.log("container", containerbow);
        toast.success("Đã Save"); // in thông báo
    }
    return (
        <div>
            {/* <Button variant="primary" onClick={() => { SaveInbound(); }}><span style={{ paddingRight: "5px" }}><FaSave /></span> Save</Button> */}
            <Button variant="primary" size="xl" onClick={() => toggle()}>
                <FaSave />&nbsp; Save
            </Button>
            <Modal isOpen={modal} toggle={() => toggle()} {...props.miss} className="modal-add">
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
                                                        <th style={{ width: "5%" }}>STT</th>
                                                        <th>Product Name</th>
                                                        <th style={{ width: "10%" }}>Missing Quantity</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {

                                                        miss.map((data, i = 0) => {
                                                            return (
                                                                <tr key={i++}>
                                                                    <td>{i + 1}</td>
                                                                    <td>{data.product}</td>
                                                                    <td style={{ color: "red" }}>{data.missquantity}</td>
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
                    {miss.length > 0 ? <Link to="/MainIB/Reback" state={data} ><button type="button" className="btn btn-dark" onClick={SaveInbound}>Save and ReBack</button></Link> : ""}
                    <Button variant="primary" onClick={SaveInbound}><i><FaSave /></i> &nbsp;
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
export default CheckIB;