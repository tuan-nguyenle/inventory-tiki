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
import NextIB from "./modalIB/NextIB";
import { Alert } from "react-bootstrap";
const InboundList = (props) => {
    const location = useLocation();
    const step = location.state;
    let orderid = "";
    let container = "";
    const state1 = [];
    const step4 = [];
    if (step) {
        orderid = step._id;
        // const step2 = JSON.parse(step); // chuyển Json thành đối tượng javascript
        const state3 = step.packages;
        state1.push(...state3);
        if (state3) {
            for (let i = 0; i < state3.length; i++) {
                const pkg = state3[i];
                const products = pkg.products.map(product => {
                    return {
                        ...product,
                        package_code: pkg.package_code
                    };
                });
                step4.push(...products);
            }
        }
        container = step.container_code;
    }
    // Lấy ngày
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = day + "/" + month + "/" + year;
    // State
    const MAX_PALLET_LENGTH = 8;
    const MAX_PACKAGE_LENGTH = 12;
    const begininputRef = useRef(null);
    const [isBarcodeScanned, setIsBarcodeScanned] = useState(false);
    const [checkSquare, setCheckSquare] = useState(false);
    const [checksquarepack, setChecksquarepack] = useState(true);
    const [checkcontainer, setCheckcontainer] = useState(false);
    const [checkpalletright, setCheckpalletright] = useState(false);
    const [data, setData] = useState([]);
    const [misssave, setMisssave] = useState([]);
    const [newmiss, setNewmiss] = useState(null);
    const [containerbowl, setContainerbowl] = useState(
        {
            codecontainervalidate: container,
            bowl: "",
        });
    const [newdata, setNewdata] = useState({
        package: "",
        bar_code: "",
        codecontainer: "",
        product_name: "",
        supplier_name: "",
        category: "",
        quantity: 1,
        sku: "",
        unit: ""
    });
    // Hàm xử lý
    const toggle = () => setCheckSquare(!checkSquare);
    const changeHandler = (e) => {
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
    const changequantity = (proquan, quan) => {
        let item = proquan.bar_code;
        let sup = proquan.supplier_name;
        let id = proquan.id;
        let sku = proquan.sku;
        let sl = quan;
        // Tìm sản phẩm trong biến data với id và bar_code tương ứng
        const product = data.find((p) => p.id === id && p.bar_code === item && p.supplier_name === sup && p.sku === sku);
        if (product) {
            // Kiểm tra nếu sl > quantity trong biến state1
            const stateProduct = state1.find((p) => p.package_code === product.package);
            if (stateProduct) {
                const productInState = stateProduct.products.find(
                    (item) =>
                        item.bar_code === product.bar_code &&
                        item.supplier_name === product.supplier_name &&
                        item.sku === product.sku
                );
                if (productInState) {
                    if (sl > productInState.quantity) {
                        toast.warning(`The maximum quantity is ${productInState.quantity} product`); // in thông báo
                        return 0;
                    } else {
                        product.quantity = sl; // Thay đổi quantity của sản phẩm trong biến state1
                        setData([...data]);
                    }
                } else {
                    toast.error("Invalid operation"); // in thông báo
                    return 0;
                }
            }
        } else {
            toast.error("Invalid operation"); // in thông báo
            return 0;
        }
    }
    const checkexists = (item, pa) => {
        let dt = data;
        let check = false;
        // let productToUpdate = null; // sản phẩm cần được cập nhật quantity
        for (let i = 0; i < data.length; i++) {
            if (dt[i].bar_code === item && dt[i].package === pa) {
                let product = dt[i];
                let productToUpdate = state1.find(p => p.package_code === pa && p.products.some(prod => {
                    return prod.bar_code === item && product.quantity >= prod.quantity;
                }));
                if (productToUpdate) {
                    toast.warning("This product has reached its quantity limit."); // in thông báo
                    check = true;
                    return check;
                }
                else {
                    product.quantity++
                    check = true;
                    break;
                }

            }

        }
        return check;
    }

    const allinfo = (item, pa) => {
        if (state1 && state1.length > 0) {
            const packageIndex = state1.findIndex((p) => p.package_code === pa);

            if (packageIndex !== -1) {
                const productIndex = state1[packageIndex].products.findIndex((p) => p.bar_code === item);
                if (productIndex !== -1) {
                    const product = state1[packageIndex].products[productIndex];
                    const newdatainput = {
                        id: Math.floor(Math.random() * 199999999 + 1),
                        bar_code: newdata.bar_code,
                        product_name: product.product_name,
                        category: product.category,
                        supplier_name: product.supplier_name,
                        date: newdate,
                        sku: product.sku,
                        quantity: newdata.quantity,
                        package: newdata.package,
                        unit: product.unit
                    };
                    setData([...data, newdatainput]);
                    setNewdata({
                        bar_code: "",
                        package: newdata.package,
                        codecontainer: newdata.codecontainer,
                        quantity: newdata.quantity,
                        unit: newdata.unit
                    });
                    return;
                }
            }
            toast.error("Product does not exist"); // in thông báo
            setNewdata({
                bar_code: "",
                codecontainer: newdata.codecontainer,
                quantity: newdata.quantity,
                package: newdata.package,
                unit: newdata.unit
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
                unit: newdata.unit
            }
            setData([...data, newdatainput]);
            setNewdata({
                package: newdata.package,
                bar_code: "",
                codecontainer: newdata.codecontainer,
                quantity: newdata.quantity,
                product_name: "",
                category: "",
                supplier_name: "",
                sku: "",
                unit: ""
            });
        }
    }
    const inputProduct = (e) => {
        e.preventDefault();
        if (!containerbowl.codecontainervalidate || !newdata.bar_code || !containerbowl.bowl || checkpalletright || checkcontainer || !newdata.package) {
            toast.error("Missing info - The information is incorrect"); // in thông báo
            return;
        }
        // let enough = check_enough(newdata.package); // check đủ rồi thì next
        let isValid = checkexists(newdata.bar_code, newdata.package); // check trùng thì tăng lên
        if (isValid == true) {
            setData([...data]);
            setNewdata({
                package: newdata.package,
                bar_code: "",
                quantity: newdata.quantity,
                codecontainer: newdata.codecontainer,
                unit: ""
            });
            return;
        }
        allinfo(newdata.bar_code, newdata.package); //check có trong excel không
    }
    const checksave = () => {
        if (step4.length > 0) {
            let missave1 = [];

            // Duyệt qua từng sản phẩm trong biến step4
            for (let i = 0; i < step4.length; i++) {
                let found = false;

                // Kiểm tra xem sản phẩm có trong biến data hay không dựa trên các thuộc tính
                for (let j = 0; j < data.length; j++) {
                    if (step4[i].bar_code === data[j].bar_code &&
                        step4[i].package_code === data[j].package &&
                        step4[i].supplier_name === data[j].supplier_name &&
                        step4[i].sku === data[j].sku) {
                        found = true;

                        // So sánh quantity
                        if (step4[i].quantity > data[j].quantity) {
                            // Lưu thông tin sản phẩm vào biến missave nếu quantity của sản phẩm trong step4 lớn hơn quantity của sản phẩm trong data
                            missave1.push({
                                ...step4[i],
                                quantity: step4[i].quantity - data[j].quantity
                            });
                        }
                        break;
                    }
                }

                // Lưu thông tin sản phẩm vào biến missave nếu sản phẩm trong biến step4 không có trong biến data
                if (!found) {
                    missave1.push(step4[i]);
                }
            }
            return missave1;
        };
    }
    //Xử lý Print
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    //xử lý next
    const inputNext = () => {
        setChecksquarepack(true);
        if (newmiss) {
            // setMisssave(prevMisssave => [...prevMisssave, ...newmiss.map(item => ({ ...item }))]);
        }
        setNewdata({
            package: "",
            bar_code: "",
            quantity: newdata.quantity,
            codecontainer: newdata.codecontainer,
            unit: newdata.unit
        });
        setNewmiss(null);
    }

    // xử lý input
    const checkBarcode = (event) => {
        const barcodeRegex = /^[0-9]{13}$/;

        if (barcodeRegex.test(event.target.value)) {
            setIsBarcodeScanned(true);
        }
    };
    const checkPack = (event) => {
        const packregex = /^[A-Za-z0-9]{12}$/;
        if (packregex.test(event.target.value)) {
            document.getElementById("bar_code").focus();
        }
    }
    const checkpallet = (event) => {
        const palletregex = /^IB-\d{5}$/;
        if (palletregex.test(event.target.value)) {
            setCheckpalletright(false);
            document.getElementById("package").focus();
        }
        else {
            setCheckpalletright(true);
        }
    };
    const checkcontai = (event) => {
        const contaitregex = new RegExp(containerbowl.codecontainervalidate + "$");
        if (contaitregex.test(event.target.value)) {
            setCheckcontainer(false);
        }
        else {
            setCheckcontainer(true);
        }

    }
    useEffect(() => {
        if (checksquarepack) {
            document.getElementById("package").focus();
        }
    }, [checksquarepack]);
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
    const [enough, setEnough] = useState(false);
    useEffect(() => {
        const checkEnough = (pa) => {
            let dt = data;
            const packageIndex = state1.findIndex(p => p.package_code === pa);
            if (packageIndex < 0) {
                // Không tìm thấy package_code trong state1
                return false;
            } else {
                // Tính tổng số lượng các sản phẩm trong biến data có package trùng với pa
                const products = dt.filter(p => p.package === pa);
                const productsQuantity = products.reduce((acc, cur) => acc + cur.quantity, 0);
                if (productsQuantity >= state1[packageIndex].products.reduce((acc, cur) => acc + cur.quantity, 0)) {
                    setChecksquarepack(true);
                    setNewdata({
                        package: "",
                        bar_code: "",
                        quantity: newdata.quantity,
                        codecontainer: newdata.codecontainer,
                        unit: ""
                    });
                    setNewmiss(null);
                    return;
                } else {
                    // Lấy ra danh sách các sản phẩm có trong biến state1 nhưng không có trong biến data
                    const productsWithoutData = state1[packageIndex].products.filter(p1 =>
                        !products.some(p2 => p1.product_name === p2.product_name)
                    );
                    // Lưu thông tin các sản phẩm chưa có trong biến data vào biến miss
                    let miss = productsWithoutData.map(p => ({
                        bar_code: p.bar_code,
                        category: p.category,
                        sku: p.sku,
                        package_code: pa,
                        product_name: p.product_name,
                        quantity: p.quantity,
                        supplier_name: p.supplier_name,
                        unit: p.unit
                    }));
                    // Lưu thông tin các sản phẩm thiếu vào biến miss
                    products.forEach(p => {
                        const productInState1 = state1[packageIndex].products.find(pr => pr.product_name === p.product_name && pr.bar_code === p.bar_code && pr.supplier_name === p.supplier_name); //sửa thành barcode nè
                        const quantityMissing = productInState1.quantity - p.quantity; // -quantity
                        if (quantityMissing > 0) {
                            miss.push({
                                package_code: pa,
                                sku: p.sku,
                                bar_code: p.bar_code,
                                category: p.category,
                                supplier_name: p.supplier_name,
                                product_name: p.product_name,
                                unit: p.unit,
                                quantity: quantityMissing
                            });
                        }
                    });
                    setChecksquarepack(false);
                    setNewmiss(miss)
                    return;
                }
            }
        };
        const enough = state1.every((p) => checkEnough(newdata.package));
        setEnough(enough);
    }, [data]);
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
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Package</label>
                                    <input id="package" type="text" maxLength={MAX_PACKAGE_LENGTH} className="form-control" placeholder="Package" value={newdata.package} disabled={checksquarepack ? "" : "{false}"} onChange={changeHandler} onInput={checkPack} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Input Code Product</label>
                                    <input id="bar_code" type="text" className="form-control" placeholder="Code-container" value={newdata.bar_code} onChange={changeHandler} onInput={checkBarcode} />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <button type="button" id="btnnhapinput" className="btn btn_nhap btn-block btn-success btn-lg" onClick={inputProduct}>Input</button>
                            </div>
                            {
                                newmiss ?
                                    <div className="next col-md-1">
                                        <NextIB misssave={newmiss} handlemissing={inputNext} />
                                    </div>
                                    : null
                            }
                        </div>
                    </form>
                    <hr></hr>
                    <ShowListIB ref={componentRef} listinput={data} container={containerbowl.codecontainervalidate} bowl={containerbowl.bowl} changequantity={changequantity} />
                    <div style={{ float: "right" }} className="row">
                        <div className="btn-button">
                            {data && data.length > 0 ?
                                <>
                                    <Button variant="warning" onClick={handlePrint}><span style={{ paddingRight: "5px" }}><FaPrint /></span> Print</Button>
                                    <CheckIB misssave={misssave} inbound={data} container={containerbowl} orderid={orderid} />
                                </>
                                : null}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};
export default InboundList;
