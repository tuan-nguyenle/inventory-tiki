import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
    FaSave, FaUserPlus
} from "react-icons/fa";
const AddUser = (props) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [newdata, setNewdata] = useState({
        fullname: "",
        account: "",
        phone: "",
    });
    // const [data, setData] = useState([]);
    const handlechangeinfo = (e) => {
        // setNewdata({ ...newdata, [e.target.name]: [e.target.value] })
        const { id, value } = e.target
        setNewdata(prevState => ({
            ...prevState,
            [id]: value
        }))
    };
    const checkvalue = () => {
        let isValid = true;
        let arrInput = ['fullname', "account"];
        for (let i = 0; i < arrInput.length; i++) {
            if (!newdata.fullname || !newdata.account || !newdata.phone) {
                isValid = false;
                toast.error("Missing Information!! Please điền cho đủ vào"); // in thông báo
                break;
            }
        }
        return isValid;
    }
    const handleraddnew = () => {
        let isValid = checkvalue()
        if (isValid === true) {
            toast.success("Add Success"); // in thông báo
            props.getnewaccount(newdata);
        }
    }
    return (
        <div>
            <Button variant="primary" size="lg" onClick={() => toggle()}>
                <FaUserPlus />&nbsp; Add Account
            </Button>
            <Modal isOpen={modal} toggle={() => toggle()} {...props} className="modal-add">
                <ModalHeader toggle={() => toggle()} className="modal-header" >Add Account</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label><b>FullName_MNV</b></label>
                                    <input id="fullname" value={newdata.fullname} onChange={handlechangeinfo} type="text" className="form-control" placeholder="Ex: Nguyen Van A_19522031" />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label><b>Phone Number</b></label>
                                    <input id="phone" value={newdata.phone} onChange={handlechangeinfo} type="tel" className="form-control" placeholder="Ex: 0203040506" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label><b>Account</b></label>
                                    <input id="account" value={newdata.account} onChange={handlechangeinfo} type="text" className="form-control" placeholder="Ex: 00001" />
                                </div>
                            </div>
                            <p>"Default password: 123456"</p>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="primary" onClick={handleraddnew}><i><FaSave /></i> &nbsp;
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
export default AddUser;