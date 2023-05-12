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
    const [datalist, setDatalist] = useState(null); // nhớ sửa đây thành null
    const [checkchange, setCheckchange] = useState(false);
    const [datadetail, setDatadetail] = useState({ shelf: "" });
    const [idchange, setIdchange] = useState({ _id: "" });
    const [ramdetail, setRamdetail] = useState([]);
    const [dataleftmau, setDataleftmau] = useState(null);
    const [dataleft, setDataleft] = useState(null);
    const [dataright, setDataright] = useState({
        pallet: "",
        _id: "",
    });

    // viết effect lấy list trái
    useEffect(() => {
        (async () => {
            try {
                let getpallet = await ICAPI.getallpallets();
                setDatalist(getpallet)
            } catch (error) {
                setDatalist(null)
            }
        })();
    }, [])
    useEffect(() => {
        if (datalist && datalist.length > 0) {
            const haveproduct = datalist.filter((IB) => IB.products.length > 0 && IB.status === true);
            setDataleftmau(haveproduct);
            setDataleft(haveproduct)

        }
    }, [datalist])
    console.log(dataleft);
    const getDetail = async (sitch, bowler) => {
        if (dataright.pallet && dataright._id) {
            toast.error("The action is invalid"); // in thông báo
            return;
        }
        if (dataleft) {
            let a = dataleft.filter((item) => item._id !== sitch)
            setDataright({
                pallet: "<<< " + bowler,
                _id: sitch
            })
            setDataleft(a);
            let b = dataleft.filter((item) => item._id === sitch)
            let c = dataleft[0].products;
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
    const setShelf = (e, changeid) => {
        const { _id, value } = e.target
        setDatadetail(prevState => ({
            ...prevState,
            [_id]: value
        }
        ))
        setIdchange({
            _id: changeid
        })
    }
    const clickinput = (e, changeid) => {
        const { _id, value } = e.target
        setDatadetail(prevState => ({
            ...prevState,
            [_id]: value
        }
        ))
        setIdchange({
            _id: changeid
        })
    }
    const inputShelf = (a, b) => {
        console.log("product code " + a, "//  " + "shelf " + b);
    }
    useEffect(() => {
        if (datadetail.shelf) {
            setCheckchange(true)
        }
        else {
            setCheckchange(false)
        }
    }, [datadetail]);

    return (
        // <>
        //     <div className="Stogare_body" >
        //         <div>
        //             <div className="Header">
        //                 <h1 style={{ textAlign: "center" }} >Storage</h1>
        //             </div>
        //             <hr></hr>
        //         </div>
        //         <div>
        //             <Row gutter={16}>
        //                 <Col span={6}>
        //                     <Card className="card scrollable-card" title="List Inbound">
        //                         {/* gọi api chỗ này */}
        //                         {
        //                             dataleft.map((data) => {
        //                                 return (
        //                                     <div key={data._id} className="detail" onClick={() => getDetail(data._id, data["pallet-container"])}>
        //                                         <p>{data["pallet-container"]}</p>
        //                                         <hr></hr>
        //                                     </div>
        //                                 )
        //                             })
        //                         }
        //                     </Card>
        //                 </Col>
        //                 <Col span={1}>
        //                     <p className="Fa" ><FaAngleDoubleRight /></p>
        //                 </Col>
        //                 <Col span={17}>
        //                     <Card className="card scrollable-card" title="Detail Inbound">
        //                         <form>
        //                             <div className="detail" onClick={() => returndetail(dataright._id)}>
        //                                 <p>{dataright.pallet}</p>
        //                                 <hr></hr>
        //                             </div>
        //                             {/* dùng vòng lặp ngay dây 
        //                             in list ngay đây
        //                             */}
        //                             <div>
        //                                 <div className="col-12">
        //                                     <div className="card">
        //                                         <div className="card-body table-responsive p-0">
        //                                             <table className="table table-hover text-nowrap">
        //                                                 <thead>
        //                                                     <tr>
        //                                                         <th>STT</th>
        //                                                         <th>Product code</th>
        //                                                         <th>Product name</th>
        //                                                         <th>Supplier</th>
        //                                                         <th>Category</th>
        //                                                         <th>Quantity</th>
        //                                                         <th>Shelf</th>
        //                                                         <th></th>
        //                                                     </tr>
        //                                                 </thead>
        //                                                 <tbody>
        //                                                     {ramdetail && ramdetail.length > 0 && ramdetail.map((data, i) => {
        //                                                         return (
        //                                                             <tr key={i + 1}>
        //                                                                 <td>{data._id}</td>
        //                                                                 <td>{data.productcode}</td>
        //                                                                 <td>{data.productname}</td>
        //                                                                 <td>{data.supplier}</td>
        //                                                                 <td>{data.category}</td>
        //                                                                 <td>{data.quantity}</td>
        //                                                                 <td style={{ width: "10%" }}><input _id="shelf" type="text" className="form-control" placeholder="Shelf" onClick={(e) => clickinput(e, data._id)} onChange={(e) => setShelf(e, data._id)} /></td>
        //                                                                 {checkchange && idchange._id === data._id ? <td><Button variant="success" onClick={() => inputShelf(data.productcode, datadetail.shelf)}>Save</Button></td>
        //                                                                     :
        //                                                                     <td><Button disabled variant="success">Save</Button></td>
        //                                                                 }
        //                                                                 {/* <td><Button variant="success" onClick={() => inputShelf(data.productcode, datadetail.shelf)}>Save</Button></td> */}
        //                                                             </tr>
        //                                                         )
        //                                                     })}
        //                                                 </tbody>
        //                                             </table>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </form>
        //                     </Card>
        //                 </Col>
        //             </Row>
        //         </div>
        //     </div>
        // </>
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
                                        {dataleftmau && dataleftmau.length > 0 && dataleftmau.map((data) => {
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
                                            <div className="detail" onClick={() => returndetail(dataright._id)}>
                                                <p>{dataright.pallet}</p>
                                                <hr />
                                            </div>
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
                                                                                <td style={{ maxWidth: "30px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{data.supplier_name}</td>
                                                                                <td >{data.category}</td>
                                                                                <td>{data.quantity}</td>
                                                                                <td>{data.sku}</td>
                                                                                <td>{data.unit}</td>
                                                                                <td style={{ width: "10%" }}><input _id="shelf" type="text" className="form-control" placeholder="Shelf" onClick={(e) => clickinput(e, data._id)} onChange={(e) => setShelf(e, data._id)} /></td>
                                                                                {
                                                                                    checkchange && idchange._id === data._id ? <td><Button variant="success" onClick={() => inputShelf(data.productcode, datadetail.shelf)}>Save</Button></td>
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