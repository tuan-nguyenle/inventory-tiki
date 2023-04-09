import React, { useState, useEffect, useRef } from "react";
import Button from 'react-bootstrap/Button';
import { useReactToPrint } from 'react-to-print';
import { NavLink, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import {
    FaRegCheckSquare, FaRegSquare, FaPrint, FaSave
} from "react-icons/fa";
import "../../styles/inbound.scss"
import ShowReback from "./ShowReback";
const Reback = (props) => {
    const location = useLocation();
    const checkstate = location.state;
    let container = "";
    let state = "";
    if (checkstate) {
        state = location.state.miss;
        const containerbow = location.state.codecontainervalidate;
        container = containerbow;
    }

    // Lấy ngày
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = day + "/" + month + "/" + year;


    // State
    const [checkSquare, setCheckSquare] = useState(false);
    const toggle = () => setCheckSquare(!checkSquare);
    const [containerbowl, setContainerbowl] = useState(
        {
            codecontainervalidate: container,
        });

    const [data, setData] = useState([]);
    const [newdata, setNewdata] = useState({
        product: "",
        missquantity: 1,
    });

    // xử lý
    const changeHandler2 = (e) => {
        const { id, value } = e.target
        setContainerbowl(prevState => ({
            ...prevState,
            [id]: value
        }))
    }
    const changeHandler = (e) => {
        const { id, value } = e.target
        setNewdata(prevState => ({
            ...prevState,
            [id]: value
        }
        ))
    }
    const checkexists = (item) => {
        let dt = data;
        let check = false;
        for (let i = 0; i < data.length; i++) {
            if (dt[i].product === item) {
                let product = dt[i];
                product.missquantity++
                check = true;
                break;
            }
        }
        return check;
    }

    const inputProduct = (e) => {
        e.preventDefault();
        if (!containerbowl.codecontainervalidate || !newdata.product) {
            toast.error("Missing info"); // in thông báo
            return;
        }
        let isValid = checkexists(newdata.product);
        // nếu trùng
        if (isValid === true) {
            setData([...data]);
            setNewdata({
                product: "",
                missquantity: newdata.missquantity,
            });
            return;
        }
        // nếu không trùng
        let newdatainput = {
            id: Math.floor((Math.random() * 199999999) + 1),
            product: newdata.product,
            missquantity: newdata.missquantity,
        }
        setData([...data, newdatainput]);
        setNewdata({
            product: "",
            missquantity: newdata.missquantity,
        });
        return;
    }
    const componentRefReback = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRefReback.current,

    });
    useEffect(() => {
        setData(state);
    }, [state]);
    const SaveReback = async () => {
        await data;
        console.log("Reback Container:", containerbowl);
        console.log("Data Reback:", data);
    }
    return (
        <div className="body_inboundList">
            <div className="container_inboundList">
                <h1 style={{ textAlign: "center" }} >Reback</h1>
            </div>
            <hr></hr>
            <div className="card card-default">
                <div className="card-body">
                    {
                        checkstate ? "" :
                            <>
                                <form>
                                    <div className="row">
                                        <div className="col-md-11">
                                            <div className="form-group">
                                                <label>Container Code</label>
                                                <input id="codecontainervalidate" type="text" className="form-control" placeholder="Code-container" disabled={checkSquare ? "" : "{false}"} onChange={changeHandler2} value={containerbowl.codecontainervalidate} />
                                            </div>
                                        </div>
                                        <div style={{ width: "40px", marginRight: "24px" }} className="col-md-1">
                                            <div className="form-group">
                                                <br />
                                                <div className="check-square">
                                                    <span className="checksquare" onClick={toggle}>
                                                        {checkSquare ? <i style={{ cursor: "pointer" }} ><FaRegCheckSquare /></i> : <i style={{ cursor: "pointer" }} ><FaRegSquare /></i>}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-10">
                                            <div className="form-group">
                                                <label>Input Code Product</label>
                                                <input id="product" type="number" className="form-control" placeholder="Code-container" value={newdata.product} onChange={changeHandler} />
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <button type="button" className="btn btn_nhap btn-block btn-success btn-lg" onClick={inputProduct}>Input</button>
                                        </div>
                                    </div>
                                </form>
                                <hr></hr>
                            </>
                    }
                    <ShowReback ref={componentRefReback} reback={data} container={containerbowl.codecontainervalidate} />
                    <div style={{ float: "right" }} className="row">
                        <div className="btn-button">
                            <Button variant="warning" onClick={handlePrint}><span style={{ paddingRight: "5px" }}><FaPrint /></span> Print</Button>
                            <Button variant="primary" onClick={SaveReback} ><span style={{ paddingRight: "5px" }}><FaSave /></span> Save</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Reback;
