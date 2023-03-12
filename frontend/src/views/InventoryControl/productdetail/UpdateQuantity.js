import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
    FaSave,
} from "react-icons/fa";
const UpdateQuantity = (props) => {

    // const ModalExample = (props) => {
    //     const {
    //         buttonLabel,
    //         className
    //     } = props
    // }
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const changeparen = () => {
        props.changechild()
    }
    return (
        <div>
            <Button variant="success" onClick={() => toggle()} >Save</Button>
            <Modal isOpen={modal} toggle={() => toggle()} {...props} className="modal-add">
                <ModalHeader toggle={() => toggle()} className="modal-header" >Delete Account</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="row">
                            <p>Do you want to delete it ?</p>
                            <h2 className="text-warning"><small>This action cannot be undone !</small></h2>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="success" onClick={() => changeparen()}>Update
                    </Button>{' '}
                    <Button variant="secondary" onClick={() => toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
export default UpdateQuantity;