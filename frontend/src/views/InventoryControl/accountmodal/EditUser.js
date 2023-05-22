import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
    FaSave, FaUserEdit,
} from "react-icons/fa";
const EditUser = (props) => {

    // const ModalExample = (props) => {
    //     const {
    //         buttonLabel,
    //         className
    //     } = props
    // }
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button variant="warning" onClick={() => toggle()} ><span style={{ paddingRight: "5px" }}><FaUserEdit /></span>Edit</Button>{' '}
            <Modal isOpen={modal} toggle={() => toggle()} {...props} className="modal-add">
                <ModalHeader toggle={() => toggle()} className="modal-header" >Edit Account</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label><b>New Password</b></label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Ex:123456@" />
                                </div>

                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label><b>Repeat Password</b></label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Ex: 123456@" />
                                </div>
                            </div>
                            <p>"Nó mà quên nữa thì đấm cho một trận. Ai đâu tạo lại cho hoài"</p>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="primary" onClick={() => toggle()}><i><FaSave /></i> &nbsp;
                        Save
                    </Button>{' '}
                    <Button variant="secondary" onClick={() => toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
export default EditUser;