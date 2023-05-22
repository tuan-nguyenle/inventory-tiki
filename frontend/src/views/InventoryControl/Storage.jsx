import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import "../../styles/inventorycontrol.scss";
import {
    FaAngleDoubleRight
} from "react-icons/fa";
import * as ICAPI from "../../services/ICAPI";
import dataListIB from "./data/dataListIB.json";
import datadetail1 from "./data/datalistDetail.json";
const Storage = () => {

    // viết hàm khi click vào trái sẽ gọi API lấy chi tiết product để show ra bên phải
    // nút save gọi một hàm truyền product vào shelf
    const [datalist, setDatalist] = useState(null);
    const [updateData, setUpdateData] = useState(false); // biến gọi lại useffect lấy pallet mới nhất
    const [checkchange, setCheckchange] = useState(false);
    const [datadetail, setDatadetail] = useState({ shelf: "" });
    const [idchange, setIdchange] = useState({ _id: "" });
    const [ramdetail, setRamdetail] = useState(null);
    const [dataleftmau, setDataleftmau] = useState(null);
    const [dataleft, setDataleft] = useState(null);
    const [dataright, setDataright] = useState({
        pallet: "",
        _id: "",
    });

    // click trái lấy product bên phải
    const getDetail = async (sitch, bowler) => {
        if (dataright.pallet && dataright._id) {
            toast.error("The action is invalid"); // in thông báo
            return;
        }
        if (dataleft) {
            let a = dataleft.filter((item) => item._id !== sitch)
            setDataright({
                pallet: bowler,
                _id: sitch
            })
            setDataleft(a);
            let b = dataleftmau.filter((item) => item._id === sitch)
            let c = b[0].products;
            setRamdetail(c);
            // try {
            //     let getpallet = await ICAPI.getproducts(sitch);

            // } catch (error) {
            //     setDatalist(null)
            // }
            // gọi API luôn truyền đi ID nhận về select * from list inbound == _id
            // setusestate bên phải ngay đây

        }

    }
    // click phải trả về rỗng
    const returndetail = () => {
        setDataleft(dataleftmau);
        setDataright({
            pallet: "",
            _id: ""
        })
        setIdchange({
            _id: ""
        })
        // return thì set lại data bên right
        setRamdetail([]);
    }
    // có nhập save thì hiệnn nút save
    const setShelf = (e, changeid) => {
        const { id, value } = e.target
        setDatadetail(prevState => ({
            ...prevState,
            [id]: value
        }
        ))
        setIdchange({
            id: changeid
        })
    }
    const [tempDatalist, setTempDatalist] = useState(null); // Tạo một state tạm thời để lưu trữ datalist
    // click vào mà có giá trị shelf thì hiển thị nút save
    const clickinput = (e, changeid) => {
        const { id, value } = e.target
        setDatadetail(prevState => ({
            ...prevState,
            [id]: value
        }
        ))
        setIdchange({
            id: changeid
        })
    }
    // tranfershelf
    const inputShelf = async (data, shelf) => {
        let datane = {
            pallet_name: dataright.pallet,
            shelf_code: shelf,
            product: data
        }
        try {
            let res = await ICAPI.transfershelf(datane);
            if (res) {
                toast.success("Success"); // in thông báo
                setUpdateData(!updateData); // gọi lại hàm useEffect
            }
        } catch (error) {
            toast.error("Error"); // in thông báo
        }
    }
    // viết effect lấy list trái
    useEffect(() => {
        (async () => {
            try {
                let getpallet = await ICAPI.getallpallets();
                setDatalist(getpallet);
                setTempDatalist(getpallet); // Lưu trữ datalist trong state tạm thời
                console.log("2");
            } catch (error) {
                setDatalist(null);
                setTempDatalist(null); // Đặt state tạm thời thành null nếu có lỗi
            }
        })();
    }, [updateData]);
    // lấy pallet có products
    useEffect(() => {
        console.log(tempDatalist);
        if (datalist && datalist.length > 0) {
            const haveproduct = datalist.filter((IB) => IB.products.length > 0 && IB.validate === true);
            setDataleftmau(haveproduct);
            setDataleft(haveproduct)

        }
    }, [datalist])
    useEffect(() => {
        if (datadetail.shelf) {
            setCheckchange(true)
        }
        else {
            setCheckchange(false)
        }
    }, [datadetail]);
    useEffect(() => {
        if (dataright._id) {
            let b = datalist.filter((item) => item._id === dataright._id)
            let c = b[0].products.filter((product) => product.quantity !== 0);
            setRamdetail(c);
            console.log(c);
        }
    }, [datalist]);
    useEffect(() => {
        if (dataright._id) {
            if (ramdetail.length === 0) {
                let c = dataleftmau.filter((product) => product._id !== dataright._id);
                setDataleft(dataleftmau);
                setDataright({
                    pallet: "",
                    _id: ""
                })
                setIdchange({
                    _id: ""
                })
                // return thì set lại data bên right
                setRamdetail([]);
            }
        }
    }, [ramdetail]);
    console.log("dataliset", datalist);
    return (
        <>
            <div className="Stogare_body" >
                <div className="container-fluid">
                    <div>
                        <div>
                            <div className="Header">
                                <h1 style={{ textAlign: "center" }} >Storage</h1>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="card_left card">
                                    <div className="card-title">
                                        <h5>List Inbound</h5>
                                    </div>
                                    <div className="card-body">
                                        {/* call API here */}
                                        {dataleft && dataleft.length > 0 && dataleft.map((data) => {
                                            return (
                                                <div key={data._id} className="card-text detail" onClick={() => getDetail(data._id, data.name_pallet)}>
                                                    <p>{data.name_pallet}</p>
                                                    <hr />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="mid_arrow col-md-1">
                                <p className="Fa"><FaAngleDoubleRight /></p>
                            </div>
                            <div className="right_table col-md-8">
                                <div className="card_right card">
                                    <div className="card-title">
                                        <h5>Detail Inbound</h5>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            {
                                                dataright && dataright.pallet ? <div className="detail" onClick={() => returndetail(dataright._id)}>
                                                    <p>{"<<< " + dataright.pallet}</p>
                                                    <hr />
                                                </div> : null
                                            }

                                            {/* use loop and display list here */}
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="card">
                                                        <div className="card-body table-responsive">
                                                            <table className="table table-hover text-nowrap">
                                                                <thead>
                                                                    <tr>
                                                                        <th>STT</th>
                                                                        <th>Product code</th>
                                                                        <th>Product name</th>
                                                                        <th>Supplier</th>
                                                                        <th>Category</th>
                                                                        <th>Quantity</th>
                                                                        <th>SKU</th>
                                                                        <th>Unit</th>
                                                                        <th>Shelf</th>
                                                                        <th></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {ramdetail && ramdetail.length > 0 && ramdetail.map((data, i) => {
                                                                        return (
                                                                            <tr key={data._id}>
                                                                                <td>{i + 1}</td>
                                                                                <td>{data.bar_code}</td>
                                                                                <td style={{ maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis" }}>{data.product_name}</td>
                                                                                <td style={{ width: "30px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{data.supplier_name}</td>
                                                                                <td >{data.category}</td>
                                                                                <td>{data.quantity}</td>
                                                                                <td>{data.sku}</td>
                                                                                <td>{data.unit}</td>
                                                                                <td style={{ width: "10%" }}><input id="shelf" type="text" className="form-control" placeholder="Shelf" onClick={(e) => clickinput(e, data._id)} onChange={(e) => setShelf(e, data._id)} /></td>
                                                                                {
                                                                                    checkchange && idchange.id === data._id ? <td><Button variant="success" onClick={() => inputShelf(data, datadetail.shelf)}>Save</Button></td>
                                                                                        :
                                                                                        <td><Button disabled variant="success">Save</Button></td>
                                                                                }
                                                                                {/* <td><Button variant="success" onClick={() => inputShelf(data.productcode, datadetail.shelf)}>Save</Button></td> */}
                                                                            </tr>
                                                                        )
                                                                    })}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}
export default Storage;