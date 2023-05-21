import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
    FaSave, FaTrashAlt,
} from "react-icons/fa";
const DeleteUser = (props) => {

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
            <Button variant="danger" onClick={() => toggle()} ><span style={{ paddingRight: "5px" }}><FaTrashAlt /></span>Delete</Button>{' '}
            <Modal isOpen={modal} toggle={() => toggle()} {...props} className="modal-add">
                <ModalHeader toggle={() => toggle()} className="modal-header" >Delete Account</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="row">
                            <p>Do you want to delete it ?</p>
                            <h2 className="text-warning"><small>This action can't be undone !</small></h2>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="danger" onClick={() => toggle()}><i><FaTrashAlt /></i> &nbsp;
                        Delete
                    </Button>{' '}
                    <Button variant="secondary" onClick={() => toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
export default DeleteUser;