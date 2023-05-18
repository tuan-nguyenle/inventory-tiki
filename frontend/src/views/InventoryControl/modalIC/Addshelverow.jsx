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
        area: "A",
        shelf_row: "",

    });
    const [newdatab, setNewdatab] = useState({
        shelf_detail: newdata.area + newdata.shelf_row
    });

    const handlechangeinfo = (e) => {
        const { id, value } = e.target
        setNewdata(prevState => ({
            ...prevState,
            [id]: value
        }))
    };
    useEffect(() => {
        setNewdatab({
            shelf_detail: newdata.area + newdata.shelf_row
        })
    }, [newdata])
    console.log();
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
                    <form>
                        <div className="row">
                            {/* <div className="col-12">
                                <div className="form-group">
                                    <input id="area" value="Inbound" type="hidden" />
                                </div>
                            </div> */}
                            <div className="col-6">
                                <div className="form-group">
                                    <label><b>Choose Area</b></label>
                                    <select id="area" onChange={handlechangeinfo} className="form-control">
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label><b>Shelf Row</b></label>
                                    <input id="shelf_row" value={newdata.shelf_row} maxLength={MAX_SHELVE_LENGTH} onChange={handlechangeinfo} type="text" className="form-control" placeholder="1-60" />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label><b>Shelf Detail</b></label>
                                    <input id="shelf_detail" value={newdatab.shelf_detail} maxLength={MAX_SHELVE_LENGTH} type="text" className="form-control" placeholder="A1.1" disabled />
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