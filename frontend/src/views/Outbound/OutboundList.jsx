import React, { useEffect, useState, useRef } from "react";
import "../../styles/outbound.scss"
import { useLocation } from "react-router-dom";
import ShowListOB from "./ShowListOB";
import { toast } from 'react-toastify';
import { useReactToPrint } from 'react-to-print';
import NextIB from "../InBound/modalIB/NextIB";
import "../../styles/inventorycontrol.scss"
import Button from 'react-bootstrap/Button';
import CheckOB from "./CheckOB";
import {
    FaRegCheckSquare, FaRegSquare, FaPrint
} from "react-icons/fa";
const OutboundList = (props) => {
    const location = useLocation();
    const step = location.state;
    // console.log(step);
    let orderid = "";
    let container = "";
    const state1 = [];
    const step4 = [];
    if (step) {
        orderid = step._id;
        const state3 = step.shelve;
        if (state3) {
            for (let i = 0; i < state3.length; i++) {
                const pkg = state3[i];
                const products = pkg.products.map(product => {
                    return {
                        ...product,
                        shelf_code: pkg.shelf_code
                    };
                });
                step4.push(...products);
            }
        }
        const state4 = [...state3];
        state4.sort((a, b) => {
            const aArr = a.shelf_code.match(/[a-z]+|\d+/gi);
            const bArr = b.shelf_code.match(/[a-z]+|\d+/gi);

            for (let i = 0; i < aArr.length && i < bArr.length; i++) {
                const aEl = aArr[i];
                const bEl = bArr[i];

                if (isNaN(aEl) && isNaN(bEl)) {
                    if (aEl < bEl) return -1;
                    if (aEl > bEl) return 1;
                } else if (!isNaN(aEl) && !isNaN(bEl)) {
                    return aEl - bEl;
                } else {
                    return isNaN(aEl) ? 1 : -1;
                }
            }

            return aArr.length - bArr.length;
        });

        state1.push(...state4);
        console.log(state1);
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
    const [currentIndex, setCurrentIndex] = useState(0);
    const [newmiss, setNewmiss] = useState(null);
    const [arrange, setArrange] = useState(null);
    const [nextClicked, setNextClicked] = useState(false); // biến cờ chỉ chạy lần đầu
    const [containerbowl, setContainerbowl] = useState(
        {
            codecontainervalidate: container,
            bowl: "",
        });
    const [newdata, setNewdata] = useState({
        bar_code: "",
        shelf_code: "",
        category: "",
        quantity: 1,
        sku: "",
        unit: ""
    });
    const [show, setShow] = useState({
        bar_code: "",
        product_name: "",
        sku: "",
        quantity: ""
    });
    const [predata, setPredata] = useState({
        shelfvalidate: "",
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
    const handleNext = () => {
        if (currentIndex < state1.length - 1) {
            setCurrentIndex(currentIndex + 1);
            // setNextClicked(true); // Đặt giá trị của biến cờ khi nhấn nút Next
        }
        else {
            setShow({
                bar_code: "",
                product_name: "",
                sku: "",
                quantity: ""
            })
            setPredata({
                shelfvalidate: "",
            })
        }
    };
    const updateInputs = () => {
        if (step) {
            const currentData = state1[currentIndex];
            setPredata({
                shelfvalidate: currentData.shelf_code,
            })
        }
    };
    useEffect(() => {
        updateInputs();
        setNextClicked(true); // Đặt lại giá trị của biến cờ sau khi gọi hàm updateInputs
    }, [currentIndex]);
    const checkexists = (item, pa) => {
        let dt = data;
        let check = false;
        // let productToUpdate = null; // sản phẩm cần được cập nhật quantity
        for (let i = 0; i < data.length; i++) {
            if (dt[i].bar_code == item && dt[i].shelf_code == pa) {
                let product = dt[i];
                // let productToUpdate = state1.find(p => p.shelf_code == pa && p.bar_code == item);
                // if (productToUpdate) {
                //     console.log("Đã đủ số lượng luôn");
                //     break;
                // }
                // console.log(product.quantity);
                let productToUpdate = state1.find(p => p.shelf_code == pa && p.products.some(prod => {
                    return prod.bar_code == item && product.quantity >= prod.quantity;
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
            const packageIndex = state1.findIndex((p) => p.shelf_code == pa);
            if (packageIndex !== -1) {
                const productIndex = state1[packageIndex].products.findIndex((p) => p.bar_code == item);
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
                        shelf_code: predata.shelfvalidate,
                        unit: product.unit
                    };
                    setData([...data, newdatainput]);
                    setNewdata({
                        bar_code: "",
                        shelf_code: newdata.shelf_code,
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
                shelf_code: newdata.shelf_code,
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
                shelf_code: newdata.shelf_code,
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
        // console.log(state1);
        e.preventDefault();
        if (!newdata.bar_code || checkpalletright || checkcontainer || !newdata.shelf_code) {
            toast.error("Missing info - The information is incorrect"); // in thông báo
            return;
        }
        // let enough = check_enough(newdata.shelf_code); // check đủ rồi thì next
        let isValid = checkexists(newdata.bar_code, newdata.shelf_code); // check trùng thì tăng lên
        if (isValid == true) {
            setData([...data]);
            setNewdata({
                shelf_code: newdata.shelf_code,
                bar_code: "",
                quantity: newdata.quantity,
                codecontainer: newdata.codecontainer,
                unit: ""
            });
            return;
        }
        allinfo(newdata.bar_code, newdata.shelf_code); //check có trong excel không
    }
    const checksave = () => {
        if (step4.length > 0) {
            let missave1 = [];

            // Duyệt qua từng sản phẩm trong biến step4
            for (let i = 0; i < step4.length; i++) {
                let found = false;

                // Kiểm tra xem sản phẩm có trong biến data hay không dựa trên các thuộc tính
                for (let j = 0; j < data.length; j++) {
                    if (step4[i].bar_code == data[j].bar_code &&
                        step4[i].shelf_code == data[j].shelf_code &&
                        step4[i].supplier_name == data[j].supplier_name &&
                        step4[i].sku == data[j].sku) {
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
            shelf_code: "",
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
    const checkpallet = (event) => {
        const palletregex = /^OB-\d{5}$/;
        if (palletregex.test(event.target.value)) {
            setCheckpalletright(false);
            document.getElementById("shelf_code").focus();
        }
        else {
            setCheckpalletright(true);
        }
    };
    const checkcontai = (event) => {
        const contaitregex = new RegExp(predata.shelfvalidate + "$");
        if (contaitregex.test(event.target.value)) {
            setCheckcontainer(false);
            document.getElementById("bar_code").focus();
        }
        else {
            setCheckcontainer(true);
        }

    }
    useEffect(() => {
        if (checksquarepack) {
            document.getElementById("shelf_code").focus();
        }
    }, [checksquarepack]);
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
            const packageIndex = state1.findIndex(p => p.shelf_code == pa);
            if (packageIndex < 0) {
                // Không tìm thấy shelf_code trong state1
                return false;
            } else {
                // Tính tổng số lượng các sản phẩm trong biến data có shelf_code trùng với pa
                const products = dt.filter(p => p.shelf_code == pa);
                const productsQuantity = products.reduce((acc, cur) => acc + cur.quantity, 0);
                if (productsQuantity >= state1[packageIndex].products.reduce((acc, cur) => acc + cur.quantity, 0)) {

                    setChecksquarepack(true);
                    setNewdata({
                        shelf_code: "",
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
                        !products.some(p2 => p1.product_name == p2.product_name)
                    );
                    // Lưu thông tin các sản phẩm chưa có trong biến data vào biến miss
                    let miss = productsWithoutData.map(p => ({
                        bar_code: p.bar_code,
                        category: p.category,
                        sku: p.sku,
                        shelf_code: pa,
                        product_name: p.product_name,
                        quantity: p.quantity,
                        supplier_name: p.supplier_name,
                        unit: p.unit
                    }));
                    // Lưu thông tin các sản phẩm thiếu vào biến miss
                    products.forEach(p => {
                        const productInState1 = state1[packageIndex].products.find(pr => pr.product_name == p.product_name && pr.bar_code == p.bar_code && pr.supplier_name == p.supplier_name); //sửa thành barcode nè
                        const quantityMissing = productInState1.quantity - p.quantity; // -quantity
                        if (quantityMissing > 0) {
                            miss.push({
                                shelf_code: pa,
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
        const enough = state1.every((p) => checkEnough(predata.shelfvalidate));
        setEnough(enough);
    }, [predata.shelfvalidate, data]);

    useEffect(() => {
        if (newmiss && newmiss.length > 0) {
            setShow({
                bar_code: newmiss[0].bar_code,
                product_name: newmiss[0].product_name,
                sku: newmiss[0].sku,
                quantity: newmiss[0].quantity
            })
        }
        if (!newmiss && nextClicked) {
            handleNext();
            setNewdata({
                bar_code: "",
                shelf_code: "",
                quantity: 1,
                sku: "",
                unit: ""
            })
        }
    }, [newmiss]);

    // console.log("miss", newmiss);
    // console.log("miss tổng", misssave);
    // console.log(miss1);
    // console.log(state1);
    console.log(data);
    // console.log(step4);
    // console.log(data);
    // console.log(isBarcodeScanned);
    // console.log(orderid);

    return (
        < div className="body_outboundlist" >
            < div className="container_outboundlist" >
                <div className="header_outboundlist">
                    <h1 style={{ textAlign: "center" }} >Outbound List</h1>
                </div>
                <hr></hr>
                {state1 ?
                    <div className="Main">
                        <div className="card card-default">
                            <div className="card-body">
                                <form>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label>Bill of lading code</label>
                                                <input id="codecontainervalidate" type="text" className="form-control" value={container} placeholder="Bill" disabled />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Pallet</label>
                                                <input id="bowl" type="text" maxLength={MAX_PALLET_LENGTH} className="form-control" placeholder="Pallet" onChange={changeHandler2} onInput={checkpallet} ref={begininputRef} />
                                            </div>
                                            {checkpalletright ? <p style={{ color: "red" }}>* The pallet is invalid!</p> : <p></p>}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>The position of the shelf_code</label>
                                                <input id="shelfvalidate" type="text" className="form-control" value={predata.shelfvalidate} placeholder="Shelf" onChange={changeHandler} disabled />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Shelf</label>
                                                <input id="shelf_code" type="text" className="form-control" value={newdata.shelf_code} placeholder="Shelf" onChange={changeHandler} onInput={checkcontai} />
                                                {checkcontainer ? <p style={{ color: "red" }}>* Mismatched!</p> : <p></p>}
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="form-group">
                                                <label>Product name</label>
                                                <input id="product_name" type="text" className="form-control" value={show.product_name} placeholder="Product Name" disabled />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label>Product code</label>
                                                <input id="productcode" type="text" className="form-control" value={show.bar_code} placeholder="Product code" disabled />
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="form-group">
                                                <label>SKU</label>
                                                <input id="SKU" type="text" className="form-control" value={show.sku} placeholder="Product code" disabled />
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="form-group">
                                                <label>Quantity</label>
                                                <input id="quantity" type="number" className="form-control" value={show.quantity} placeholder="Number" disabled />
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label>Input Code Product</label>
                                                <input id="bar_code" type="text" className="form-control" value={newdata.bar_code} placeholder="Code-container" onChange={changeHandler} onInput={checkBarcode} />
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <button type="button" id="btnnhapinput" className="btn btn_nhap btn-block btn-success btn-lg" onClick={inputProduct}>Input</button>
                                        </div>
                                        {/* <div className="col-md-2">
                                            <button type="button" id="btnnhapinput1" className="btn btn_nhap btn-block btn-success btn-lg" onClick={handleNext}>Next</button>
                                        </div> */}
                                        {
                                            newmiss ?
                                                <div className="next col-md-2">
                                                    <NextIB misssave={newmiss} handlemissing={inputNext} />
                                                </div>
                                                : null
                                        }
                                    </div>
                                </form>
                                <hr></hr>
                                <ShowListOB ref={componentRef} listinput={data} container={containerbowl.codecontainervalidate} bowl={containerbowl.bowl} />
                                <div style={{ float: "right" }} className="row">
                                    <div className="btn-button">
                                        {data && data.length > 0 ?
                                            <>
                                                <Button variant="warning" onClick={handlePrint}><span style={{ paddingRight: "5px" }}><FaPrint /></span> Print</Button>
                                                <CheckOB misssave={misssave} inbound={data} container={containerbowl} orderid={orderid} />
                                            </>
                                            : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> :
                    <>
                        <div className="outbound2">
                            <div className="row">
                                <div className="col-md-8">
                                    <form>
                                        <div className="input-group">
                                            <input type="text" className="form-control form-control-lg" placeholder="Bill of lading code" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </>}
            </div >
        </div >
    )
}
export default OutboundList;
