import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
    FaSave, FaUserPlus, FaPlus
} from "react-icons/fa";
import * as ICAPI from "../../../services/ICAPI";
const Addshelfrow = (props) => {
    const MAX_SHELVE_LENGTH = 2;
    const [currentModal, setCurrentModal] = useState("A");

    const [modalA, setModalA] = useState(false);
    const [modalB, setModalB] = useState(false);

    const toggleModalA = () => setModalA(!modalA);
    const toggleModalB = () => setModalB(!modalB);

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [newdata, setNewdata] = useState({
        name_pallet: "",
        area: "Inbound",
        type: "Metal",
        weight: "800",
        length: "100",
        width: "100",
        height: "120",

    });

    const handlechangeinfo = (e) => {
        const { id, value } = e.target
        setNewdata(prevState => ({
            ...prevState,
            [id]: value
        }))
    };
    const checkvalue = () => {
        let isValid = true;
        let arrInput = ["name_pallet", "area", "type", "length", "width", "height", "weight"];
        for (let i = 0; i < arrInput.length; i++) {
            if (!newdata.name_pallet || !newdata.area || !newdata.type || !newdata.weight || !newdata.width || !newdata.length || !newdata.height) {
                isValid = false;
                break;
            }
        }
        console.log(newdata.name_pallet, newdata.area, newdata.type, newdata.weight, newdata.width, newdata.length, newdata.height);
        return isValid;
    }
    const handleraddnew = async () => {
        let isValid = checkvalue()
        // props.getnewaccount(newdata);
        if (isValid === true) {
            const handledata = [{
                name_pallet: "IB-" + newdata.name_pallet,
                area: newdata.area,
                type: newdata.type,
                dimensions: {
                    length: newdata.length,
                    width: newdata.width,
                    height: newdata.height
                },
                weight: newdata.weight,
                products: [],
                status: false
            }]
            // gọi api ở dây
            // try {
            //     let notifi = await ICAPI.createPallet(handledata); // truyền json qua
            //     if (notifi) {
            //         setNewdata({
            //             name_pallet: "",
            //             area: "Inbound",
            //             type: "Metal",
            //             weight: "800",
            //             length: "100",
            //             width: "100",
            //             height: "120",


            //         })
            //         toast.success("Created successfully"); // in thông báo xong
            //         toggle();
            //         props.fetchPalletList();
            //     }
            // } catch (error) {
            //     toast.error("Server not responding"); // in thông báo lỗi
            // }
        }
        else {
            toast.error("Missing Information!"); // in thông báo
        }
    }
    return (
        <div>
            <span style={{ fontSize: "20px" }} size="lg" onClick={() => toggle()} ><i><FaPlus /></i>Shelf row</span>

            <Modal isOpen={modal} toggle={() => toggle()} {...props} className="modal-add">
                <ModalHeader toggle={() => toggle()} className="modal-header" >Add New Shelf Row</ModalHeader>
                <ModalBody>
                    <button onClick={() => toggleModalA()}>Shelf</button>
                    <button onClick={() => toggleModalB()}>Shelf Row</button>
                    <hr></hr>
                    <form>
                        <div className="row">
                            {/* <div className="col-12">
                                <div className="form-group">
                                    <input id="area" value="Inbound" type="hidden" />
                                </div>
                            </div> */}
                            <div className="col-4">
                                <div className="form-group">
                                    <label><b>Choose Area</b></label>
                                    <select id="area" onChange={handlechangeinfo} className="form-control">
                                        <option value="Metal">A</option>
                                        <option value="Wood">B</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-group">
                                    <label><b>Shlef Row</b></label>
                                    <select id="area" onChange={handlechangeinfo} className="form-control">
                                        <option value="Metal">A1</option>
                                        <option value="Wood">A2</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-group">
                                    <label><b>Shelf Numer</b></label>
                                    <input id="name_pallet" value={newdata.name_pallet} maxLength={MAX_SHELVE_LENGTH} onChange={handlechangeinfo} type="text" className="form-control" placeholder="1-20" />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label><b>Shelf Detail</b></label>
                                    <input id="name_pallet" value={newdata.name_pallet} maxLength={MAX_SHELVE_LENGTH} type="text" className="form-control" placeholder="A1.1" disabled />
                                </div>
                            </div>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="primary" onClick={handleraddnew}><i><FaSave /></i> &nbsp;
                        Create
                    </Button>
                    <Button variant="secondary" onClick={() => toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div >
    );
}
export default Addshelfrow;