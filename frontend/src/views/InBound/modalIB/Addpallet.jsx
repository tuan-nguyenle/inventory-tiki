
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
    FaSave, FaUserPlus, FaPlus
} from "react-icons/fa";
import * as IBAPI from "../../../services/IBAPI";
const Addpallet = (props) => {
    const MAX_PALLET_LENGTH = 5;
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [newdata, setNewdata] = useState({
        name_pallet: "",
        area: "Inbound",
        type: "metal",
        weight: "0.8",
        length: "100",
        width: "100",
        height: "120",

    });
    // const [data, setData] = useState([]);
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
        console.log(newdata.name_pallet, newdata.area, newdata.metal, newdata.type, newdata.weight, newdata.width, newdata.length, newdata.height);
        return isValid;
    }
    const handleraddnew = async () => {
        let isValid = checkvalue()
        // props.getnewaccount(newdata);


        if (isValid === true) {
            const handledata = {
                name_pallet: "IB-" + newdata.name_pallet,
                area: newdata.area,
                type: newdata.type,
                dimensions: {
                    length: newdata.length,
                    width: newdata.width,
                    height: newdata.height
                },
                weight: newdata.weight,
                products: []
            }
            // gọi api ở dây
            try {
                let notifi = await IBAPI.createPallet(handledata); // truyền json qua
                if (notifi) {
                    setNewdata({
                        name_pallet: "",
                        area: "Inbound",
                        type: "metal",
                        weight: "0.8",
                        length: "100",
                        width: "100",
                        height: "120",

                    })
                    toast.error("Created successfully"); // in thông báo xong
                }
            } catch (error) {
                toast.error("Server not responding"); // in thông báo lỗi
            }
        }
        else {
            toast.error("Missing Information!"); // in thông báo
        }
    }
    const toggleExtendDiv = () => {
        const extendDiv = document.getElementById("extend-div");
        "none" === extendDiv.style.display ? extendDiv.style.display = "block" : extendDiv.style.display = "none"
    };
    return (
        <div>
            <span size="lg" onClick={() => toggle()} ><i><FaPlus /></i></span>
            <Modal isOpen={modal} toggle={() => toggle()} {...props} className="modal-add">
                <ModalHeader toggle={() => toggle()} className="modal-header" >Add New Pallet</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <input id="area" value="Inbound" type="hidden" />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label><b>Pallet Code</b></label>
                                    <input id="name_pallet" value={newdata.name_pallet} maxLength={MAX_PALLET_LENGTH} onChange={handlechangeinfo} type="text" className="form-control" placeholder="00001" />
                                </div>
                            </div>
                            <div style={{ textAlign: "center", cursor: "pointer" }} className="col-12" onClick={toggleExtendDiv}>
                                <hr></hr>
                                <p style={{ fontStyle: "italic" }}>Extends </p>
                            </div>
                            <div id="extend-div" style={{ display: "none" }}>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label><b>Choose Pallet Type</b></label>
                                            <select id="type" onChange={handlechangeinfo} className="form-control">
                                                <option value="metal">Metal</option>
                                                <option value="wood">Wood</option>
                                                <option value="plastic">Plastic</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label><b>Weight(kg)</b></label>
                                            <input id="weight" value={newdata.weight} onChange={handlechangeinfo} type="text" className="form-control" placeholder="0.8" />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label><b>Length(cm)</b></label>
                                            <input id="length" value={newdata.length} onChange={handlechangeinfo} type="text" className="form-control" placeholder="100" />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label><b>width(cm)</b></label>
                                            <input id="width" value={newdata.width} onChange={handlechangeinfo} type="text" className="form-control" placeholder="100" />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label><b>height(cm)</b></label>
                                            <input id="height" value={newdata.height} onChange={handlechangeinfo} type="text" className="form-control" placeholder="120" />
                                        </div>
                                    </div>
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
export default Addpallet;