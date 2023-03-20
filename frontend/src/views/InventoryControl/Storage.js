import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import "../../styles/inventorycontrol.scss";
import {
    FaAngleDoubleRight
} from "react-icons/fa";
import { Card, Col, Row } from 'antd';
import dataListIB from "./data/dataListIB.json";
import datadetail1 from "./data/datalistDetail.json";
const Storage = () => {

    const [datalist, setDatalist] = useState(dataListIB);
    const [checkchange, setCheckchange] = useState(false);
    const [datadetail, setDatadetail] = useState({ shelf: "" });
    const [idchange, setIdchange] = useState({ id: "" });
    const [ramdetail, setRamdetail] = useState([]);
    const [dataleft, setDataleft] = useState(datalist);
    const [dataright, setDataright] = useState({
        bowl: "",
        id: "",
    });


    const getDetail = (sitch, bowler) => {
        if (dataright.bowl && dataright.id) {
            toast.error("The action is invalid"); // in thông báo
            return;
        }
        let a = dataleft.filter((item) => item.id !== sitch)
        setDataright({
            bowl: "<<< " + bowler,
            id: sitch
        })
        setDataleft(a);
        // gọi API luôn truyền đi ID nhận về select * from list inbound == id
        // setusestate bên phải ngay đây
        setRamdetail(datadetail1);
    }
    const returndetail = () => {
        setDataleft(datalist);
        setDataright({
            bowl: "",
            id: ""
        })
        setIdchange({
            id: ""
        })
        // return thì set lại data bên right
        setRamdetail([]);
    }
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
        <>
            <div className="Stogare_body" >
                <div>
                    <div className="Header">
                        <h1 style={{ textAlign: "center" }} >Storage</h1>
                    </div>
                    <hr></hr>
                </div>
                <div>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Card className="card scrollable-card" title="List Inbound">
                                {/* gọi api chỗ này */}
                                {
                                    dataleft.map((data) => {
                                        return (
                                            <div key={data.id} className="detail" onClick={() => getDetail(data.id, data["bowl-container"])}>
                                                <p>{data["bowl-container"]}</p>
                                                <hr></hr>
                                            </div>
                                        )
                                    })
                                }
                            </Card>
                        </Col>
                        <Col span={1}>
                            <p className="Fa" ><FaAngleDoubleRight /></p>
                        </Col>
                        <Col span={17}>
                            <Card className="card scrollable-card" title="Detail Inbound">
                                <form>
                                    <div className="detail" onClick={() => returndetail(dataright.id)}>
                                        <p>{dataright.bowl}</p>
                                        <hr></hr>
                                    </div>
                                    {/* dùng vòng lặp ngay dây 
                                    in list ngay đây
                                    */}
                                    <div>
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="card-body table-responsive p-0">
                                                    <table className="table table-hover text-nowrap">
                                                        <thead>
                                                            <tr>
                                                                <th>STT</th>
                                                                <th>Product code</th>
                                                                <th>Product name</th>
                                                                <th>Supplier</th>
                                                                <th>Category</th>
                                                                <th>Quantity</th>
                                                                <th>Shelf</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {ramdetail && ramdetail.length > 0 && ramdetail.map((data, i) => {
                                                                return (
                                                                    <tr key={i + 1}>
                                                                        <td>{data.id}</td>
                                                                        <td>{data.productcode}</td>
                                                                        <td>{data.productname}</td>
                                                                        <td>{data.supplier}</td>
                                                                        <td>{data.category}</td>
                                                                        <td>{data.quantity}</td>
                                                                        <td style={{ width: "10%" }}><input id="shelf" type="text" className="form-control" placeholder="Shelf" onClick={(e) => clickinput(e, data.id)} onChange={(e) => setShelf(e, data.id)} /></td>
                                                                        {checkchange && idchange.id === data.id ? <td><Button variant="success" onClick={() => inputShelf(data.productcode, datadetail.shelf)}>Save</Button></td>
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
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}
export default Storage;