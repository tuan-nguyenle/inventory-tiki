import React, { useEffect, useState, useRef } from "react";
import Button from 'react-bootstrap/Button';
import { useLocation } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import {
    FaRegCheckSquare, FaRegSquare, FaPrint
} from "react-icons/fa";
import "../../styles/inbound.scss"
import ShowListIB from "./ShowListIB";
import CheckIB from "./modalIB/CheckIB";
const InboundList = (props) => {
    const location = useLocation();
    const step = location.state;
    let container = "";
    const state1 = [];
    if (step) {
        const step2 = JSON.parse(step); // chuyển Json thành đối tượng javascript
        const step3 = step2.packages;
        const step4 = step3.flatMap(pkg => pkg.products);
        container = step2.container_code;
        if (step4) {
            state1.unshift(container);
            state1.push(...step4);
        }
        // console.log(state1);
    }
    // Lấy ngày
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = day + "/" + month + "/" + year;

    // State
    const MAX_PALLET_LENGTH = 8;
    const begininputRef = useRef(null);
    const [isBarcodeScanned, setIsBarcodeScanned] = useState(false);
    const [checkSquare, setCheckSquare] = useState(false);
    const [checkcontainer, setCheckcontainer] = useState(false);
    const [checkpalletright, setCheckpalletright] = useState(false);
    const [data, setData] = useState([]);
    const [misssave, setMisssave] = useState([]);
    const [containerbowl, setContainerbowl] = useState(
        {
            codecontainervalidate: container,
            bowl: "",
        });
    const [newdata, setNewdata] = useState({
        bar_code: "",
        codecontainer: "",
        product_name: "",
        supplier_name: "",
        category: "",
        quantity: 1,
        sku: "",
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
            if (dt[i].bar_code == item) {
                // console.log("đã tồn tại", data[i])
                let product = dt[i];   // thay đổi 1 giá trị trong object của state
                // dt = dt.filter(product => product.bar_code !== item);
                product.quantity++
                check = true;
                break;
            }

        }
        return check;
    }
    const allinfo = (item) => {
        if (state1 && state1.length > 0) {
            for (let i = 1; i < state1.length; i++) {
                if (state1[i].bar_code == item) {
                    let pr = state1[i]
                    let newdatainput = {
                        id: Math.floor((Math.random() * 199999999) + 1),
                        bar_code: newdata.bar_code,
                        product_name: pr.product_name,
                        category: pr.category,
                        supplier_name: pr.supplier_name,
                        date: newdate,
                        sku: pr.sku,
                        quantity: newdata.quantity,
                    }
                    setData([...data, newdatainput]);
                    setNewdata({
                        bar_code: "",
                        codecontainer: newdata.codecontainer,
                        quantity: newdata.quantity,
                    });
                    return;

                }
            }
            toast.error("Product does not exist"); // in thông báo
            setNewdata({
                bar_code: "",
                codecontainer: newdata.codecontainer,
                quantity: newdata.quantity,
            });
        } else {
            if (!containerbowl.codecontainervalidate || !newdata.bar_code || !containerbowl.bowl || !newdata.product_name || !newdata.category) {
                toast.error("Missing info"); // in thông báo
                return;
            }
            let newdatainput = {
                id: Math.floor((Math.random() * 199999999) + 1),
                bar_code: newdata.bar_code,
                product_name: newdata.product_name,
                category: newdata.category,
                supplier_name: newdata.supplier_name,
                sku: newdata.sku,
                date: newdate,
                quantity: newdata.quantity,
            }
            setData([...data, newdatainput]);
            setNewdata({
                bar_code: "",
                codecontainer: newdata.codecontainer,
                quantity: newdata.quantity,
                product_name: "",
                category: "",
                supplier_name: "",
                sku: "",
            });
        }
    }
    const inputProduct = (e) => {
        e.preventDefault();
        if (!containerbowl.codecontainervalidate || !newdata.bar_code || !containerbowl.bowl || checkpalletright || checkcontainer) {
            toast.error("Missing info"); // in thông báo
            return;
        }
        let isValid = checkexists(newdata.bar_code);
        if (isValid == true) {
            setData([...data]);
            setNewdata({
                bar_code: "",
                quantity: newdata.quantity,
                codecontainer: newdata.codecontainer,
            });
            return;
        }
        allinfo(newdata.bar_code);
    }

    const checksave = () => {
        if (state1.length > 0) {
            let newMisssave = [];
            for (let i = 1; i < state1.length; i++) {
                let obj = state1[i];
                if (obj.hasOwnProperty("bar_code")) { // Kiểm tra xem đối tượng có chứa key "c" hay không
                    let productcodeValue = obj.bar_code;
                    let productquantity = obj.quantity;
                    let foundproductcodeValue = data.some((o) => o.hasOwnProperty("bar_code") && o.bar_code == productcodeValue && o.quantity == productquantity); // Tìm kiếm đối tượng có chứa key ""và có giá trị bằng với productcodeValue và quantity
                    if (!foundproductcodeValue) {
                        let foundData = data.find((o) => o.bar_code == productcodeValue);
                        let quantityDifference = foundData && foundData.quantity ? productquantity - foundData.quantity : productquantity;
                        // let quantityDifference = data.find((o) => o.bar_code == productcodeValue);
                        if (quantityDifference !== 0) {
                            let newhaha = {
                                product: obj.product_name,
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
        if (state1 && state1.length > 0) {
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

    // xử lý input
    const checkBarcode = (event) => {
        const barcodeRegex = /^[0-9]{3}$/;

        if (barcodeRegex.test(event.target.value)) {
            setIsBarcodeScanned(true);
        }
    };
    const checkpallet = (event) => {
        const palletregex = /^IB-\d{5}$/;
        if (palletregex.test(event.target.value)) {
            setCheckpalletright(false);
            document.getElementById("bar_code").focus();
        }
        else {
            setCheckpalletright(true);
        }
    };
    const checkcontai = (event) => {
        const contaitregex = new RegExp(containerbowl.codecontainervalidate);
        if (contaitregex.test(event.target.value)) {
            setCheckcontainer(false);
        }
        else {
            setCheckcontainer(true);
        }

    }
    useEffect(() => {
        if (!checkcontainer) {
            // nextinput.current.focus();
            document.getElementById("bowl").focus();
        }
    }, [checkcontainer]);
    useEffect(() => {
        if (isBarcodeScanned) {
            document.getElementById("btnnhapinput").click();
            setIsBarcodeScanned(false);
        }
    }, [isBarcodeScanned]);
    useEffect(() => {
        if (step) {
            const newMisssave = checksave();
            setMisssave(newMisssave);
        }

    }, [step, data]);
    useEffect(() => {
        begininputRef.current.focus();
    }, []);

    return (
        <div className="body_inboundList" >
            <div className="container_inboundList">
                <h1 style={{ textAlign: "center" }} >Inbound List</h1>
            </div>
            <hr></hr>
            <div className="card card-default">
                <div className="card-body">
                    <form>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Container Code</label>
                                    <input id="codecontainervalidate" type="text" className="form-control" placeholder="Code-container" disabled={checkSquare ? "" : "{false}"} value={containerbowl.codecontainervalidate} onChange={changeHandler2} autoComplete="off" />
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
                                    <input id="codecontainer" type="text" className="form-control" placeholder="Code-container" onChange={changeHandler} onInput={checkcontai} ref={begininputRef} />
                                    {checkcontainer ? <p style={{ color: "red" }}>* Mismatched!</p> : <p></p>}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Pallet</label>
                                    <input id="bowl" type="text" maxLength={MAX_PALLET_LENGTH} className="form-control" placeholder="Pallet" onChange={changeHandler2} onInput={checkpallet} />
                                </div>
                                {checkpalletright ? <p style={{ color: "red" }}>* The pallet is invalid!</p> : <p></p>}
                            </div>
                            {!step ? <>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Product Name</label>
                                        <input id="product_name" type="text" className="form-control" placeholder="Product Name" value={newdata.product_name} onChange={changeHandler} />
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
                                    <input id="bar_code" type="text" className="form-control" placeholder="Code-container" value={newdata.bar_code} onChange={changeHandler} onInput={checkBarcode} />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <button type="button" id="btnnhapinput" className="btn btn_nhap btn-block btn-success btn-lg" onClick={inputProduct}>Input</button>
                            </div>
                        </div>
                    </form>
                    <hr></hr>
                    <ShowListIB ref={componentRef} listinput={data} container={containerbowl.codecontainervalidate} bowl={containerbowl.bowl} />
                    <div style={{ float: "right" }} className="row">
                        <div className="btn-button">
                            {data && data.length > 0 ?
                                <>
                                    <Button variant="warning" onClick={handlePrint}><span style={{ paddingRight: "5px" }}><FaPrint /></span> Print</Button>
                                    <CheckIB misssave={misssave} inbound={data} container={containerbowl} />
                                </>
                                : null}

                            {/* <Button variant="primary" onClick={() => { SaveInbound(); }}><span style={{ paddingRight: "5px" }}><FaSave /></span> Save</Button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};
export default InboundList;
