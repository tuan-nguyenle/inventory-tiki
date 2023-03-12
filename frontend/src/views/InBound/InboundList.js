import React, { useEffect, useState, useRef } from "react";
import Button from 'react-bootstrap/Button';
import { useLocation } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import {
    FaRegCheckSquare, FaRegSquare, FaPrint, FaSave
} from "react-icons/fa";
import "../../styles/inbound.scss"
import ShowListIB from "./ShowListIB";
import CheckIB from "./modalIB/CheckIB";
const InboundList = (props) => {
    const location = useLocation();
    const state = location.state;
    let container = "";
    if (state) {
        container = location.state[0];
    }
    // Lấy ngày
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = day + "/" + month + "/" + year;

    // State
    const [checkSquare, setCheckSquare] = useState(false);
    const [checkcontainer, setCheckcontainer] = useState(false);
    const [data, setData] = useState([]);
    const [misssave, setMisssave] = useState([]);
    const [currentMisssave, setCurrentMisssave] = useState([]);
    const [containerbowl, setContainerbowl] = useState(
        {
            codecontainervalidate: container,
            bowl: "",
        });
    const [newdata, setNewdata] = useState({
        productcode: "",
        codecontainer: "",
        productname: "",
        category: "",
        quantity: 1,
    });
    // Hàm xử lý
    const toggle = () => setCheckSquare(!checkSquare);
    const changeHandler = (e) => {
        // setNewdata({ ...newdata, [e.target.name]: [e.target.value] });
        const { id, value } = e.target
        setNewdata(prevState => ({
            ...prevState,
            [id]: value
        }
        ))
        if (id === "codecontainer" && value !== containerbowl.codecontainervalidate) {
            setCheckcontainer(true);
        }
        else {
            setCheckcontainer(false);
        }
    }
    const changeHandler2 = (e) => {
        const { id, value } = e.target
        setContainerbowl(prevState => ({
            ...prevState,
            [id]: value
        }))
    }
    const checkexists = (item) => {
        let dt = data;
        let check = false;
        for (let i = 0; i < data.length; i++) {
            if (dt[i].productcode === item) {
                // console.log("đã tồn tại", data[i])
                let product = dt[i];   // thay đổi 1 giá trị trong object của state
                // dt = dt.filter(product => product.productcode !== item);
                product.quantity++
                check = true;
                break;
            }

        }
        return check;
    }
    const allinfo = (item) => {
        if (state && state.length > 0) {
            for (let i = 1; i < state.length; i++) {
                if (state[i].productcode === item) {
                    let pr = state[i]
                    let newdatainput = {
                        id: Math.floor((Math.random() * 199999999) + 1),
                        productcode: newdata.productcode,
                        productname: pr.productname,
                        category: pr.category,
                        date: newdate,
                        quantity: newdata.quantity,
                    }
                    setData([...data, newdatainput]);
                    setNewdata({
                        productcode: "",
                        codecontainer: newdata.codecontainer,
                        quantity: newdata.quantity,
                    });
                    return;

                }
            }
            toast.error("Product does not exist"); // in thông báo
            setNewdata({
                productcode: "",
                codecontainer: newdata.codecontainer,
                quantity: newdata.quantity,
            });
        } else {
            if (!containerbowl.codecontainervalidate || !newdata.productcode || !containerbowl.bowl || !newdata.productname || !newdata.category) {
                toast.error("Missing info"); // in thông báo
                return;
            }
            let newdatainput = {
                id: Math.floor((Math.random() * 199999999) + 1),
                productcode: newdata.productcode,
                productname: newdata.productname,
                category: newdata.category,
                date: newdate,
                quantity: newdata.quantity,
            }
            setData([...data, newdatainput]);
            setNewdata({
                productcode: "",
                codecontainer: newdata.codecontainer,
                quantity: newdata.quantity,
                productname: "",
                category: "",
            });
        }
    }
    const inputProduct = (e) => {
        e.preventDefault();
        if (!containerbowl.codecontainervalidate || !newdata.productcode || !containerbowl.bowl) {
            toast.error("Missing info"); // in thông báo
            return;
        }
        let isValid = checkexists(newdata.productcode);
        if (isValid === true) {
            setData([...data]);
            setNewdata({
                productcode: "",
                quantity: newdata.quantity,
                codecontainer: newdata.codecontainer,
            });
            return;
        }
        allinfo(newdata.productcode);
    }

    const checksave = () => {
        if (state.length > 0) {
            let newMisssave = [];
            for (let i = 1; i < state.length; i++) {
                let obj = state[i];
                if (obj.hasOwnProperty("productcode")) { // Kiểm tra xem đối tượng có chứa key "c" hay không
                    let productcodeValue = obj.productcode;
                    let productquantity = obj.quantity;
                    let foundproductcodeValue = data.some((o) => o.hasOwnProperty("productcode") && o.productcode === productcodeValue && o.quantity === productquantity); // Tìm kiếm đối tượng có chứa key ""và có giá trị bằng với productcodeValue và quantity
                    if (!foundproductcodeValue) {
                        let foundData = data.find((o) => o.productcode === productcodeValue);
                        let quantityDifference = foundData && foundData.quantity ? productquantity - foundData.quantity : productquantity;
                        // let quantityDifference = data.find((o) => o.productcode === productcodeValue);
                        if (quantityDifference !== 0) {
                            let newhaha = {
                                product: obj.productname,
                                missquantity: quantityDifference,
                                codecontainer: container
                            }
                            // setMisssave(prevMisssave => [...prevMisssave, newhaha]) // callback
                            newMisssave = [...newMisssave, newhaha];
                        }

                    }
                }
            }
            return newMisssave;
        }
    }
    const SaveInbound = async () => {
        if (state && state.length > 0) {
            // const getmiss = await checksave();
            // if (getmiss.length > 0) {
            //     console.log("thiếu", getmiss);
            // }
            // else {
            //     console.log("không")
            // }
            // setCurrentMisssave(misssave);
            console.log(misssave);
        }
        console.log("Data dữ liệu: ", data);
        console.log("Container: ", containerbowl);
        toast.success("Đã Save"); // in thông báo
    }
    //Xử lý Print
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,

    });
    // const handlePrint = async () => {
    //     // await new Promise((resolve) => setTimeout(resolve, 1000)); // Đợi 1 giây để tải nội dung in
    //     // await success();
    //     // if (success) {
    //     //     toast.success("Đã in"); // in thông báo
    //     // } else {
    //     //     console.log("Đợi 3s nữa")
    //     //     setTimeout(handlePrint, 6000);
    //     // }
    // };
    // useEffect(() => {
    //     console.log("Current misssave: ", currentMisssave);
    // }, [currentMisssave]);
    useEffect(() => {
        if (state) {
            const newMisssave = checksave();
            setMisssave(newMisssave);
        }

    }, [state, data]);
    return (
        <div className="body_inboundList" >
            <div className="container_inboundList">
                <h1 style={{ textAlign: "center" }} >InboundList</h1>
            </div>
            <hr></hr>
            <div className="card card-default">
                {/* <div className="card-header">
                    <h3 className="card-title">Quét mã barcode</h3>
                    <div className="card-tools">
                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                            <i className="fas fa-minus"></i>
                        </button>
                        <button type="button" className="btn btn-tool" data-card-widget="remove">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div> */}
                <div className="card-body">
                    <form>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Container Code</label>
                                    <input id="codecontainervalidate" type="text" className="form-control" placeholder="Code-container" disabled={checkSquare ? "" : "{false}"} value={containerbowl.codecontainervalidate} onChange={changeHandler2} />
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
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Container Code</label>
                                    <input id="codecontainer" type="text" className="form-control" placeholder="Code-container" onChange={changeHandler} />
                                    {checkcontainer ? <p style={{ color: "red" }}>* Mismatched!</p> : <p></p>}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Bowl</label>
                                    <input id="bowl" type="text" className="form-control" placeholder="Bowl" onChange={changeHandler2} />
                                </div>
                            </div>
                            {!state ? <>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Product Name</label>
                                        <input id="productname" type="text" className="form-control" placeholder="Product Name" value={newdata.productname} onChange={changeHandler} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Category</label>
                                        <input id="category" type="text" className="form-control" placeholder="Category" value={newdata.category} onChange={changeHandler} />
                                    </div>
                                </div></> : null}
                            <div className="col-md-10">
                                <div className="form-group">
                                    <label>Input Code Product</label>
                                    <input id="productcode" type="number" className="form-control" placeholder="Code-container" value={newdata.productcode} onChange={changeHandler} />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <button type="button" className="btn btn_nhap btn-block btn-success btn-lg" onClick={inputProduct}>Input</button>
                            </div>
                        </div>
                    </form>
                    <hr></hr>
                    <ShowListIB ref={componentRef} listinput={data} container={containerbowl.codecontainervalidate} bowl={containerbowl.bowl} />
                    <div style={{ float: "right" }} className="row">
                        <div className="btn-button">
                            <Button variant="warning" onClick={handlePrint}><span style={{ paddingRight: "5px" }}><FaPrint /></span> Print</Button>
                            <CheckIB misssave={misssave} inbound={data} container={containerbowl} />
                            {/* <Button variant="primary" onClick={() => { SaveInbound(); }}><span style={{ paddingRight: "5px" }}><FaSave /></span> Save</Button> */}
                        </div>
                    </div>
                </div>
            </div>

        </div >
    );
};
export default InboundList;
