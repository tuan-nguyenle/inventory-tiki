import React, { useEffect, useState, useRef } from "react";
import "../../styles/outbound.scss"
import { useLocation } from "react-router-dom";
import ShowListOB from "./ShowListOB";
import { toast } from 'react-toastify';

const OutboundList = (props) => {
    const location = useLocation();
    const billlist = location.state;
    let listbill = "";
    if (billlist) {
        listbill = billlist.listbill;
    }
    const [bill, setBill] = useState(listbill);
    const [packageob, setPackageob] = useState(null);
    const [data, setdata] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // cho mỗi lần chuyển tab
    const inputbill = useRef(null);
    useEffect(() => {
        if (inputbill.current) {
            inputbill.current.focus();
        }
    }, []);
    return (
        < div className="body_outboundlist" >
            < div className="container_outboundlist" >
                <div className="header_outboundlist">
                    <h1 style={{ textAlign: "center" }} >Outbound List</h1>
                </div>
                <hr></hr>
                {billlist ?
                    <div className="Main">
                        <div className="card card-default">
                            <div className="card-body">
                                <form>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label>Bill of lading code</label>
                                                <input id="codecontainervalidate" type="text" className="form-control" placeholder="Bill" value={billlist.bill} disabled />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Pallet</label>
                                                <input id="bowl" type="text" className="form-control" placeholder="Pallet" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>The position of the shelf</label>
                                                <input id="shelf" type="text" className="form-control" placeholder="Shelf" value={bill[currentIndex].productname} disabled />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Shelf</label>
                                                <input id="shelf" type="text" className="form-control" placeholder="Shelf" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Product name</label>
                                                <input id="productname" type="text" className="form-control" placeholder="Product Name" disabled />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label>Product code</label>
                                                <input id="productcode" type="text" className="form-control" placeholder="Product code" disabled />
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="form-group">
                                                <label>Quantity</label>
                                                <input id="quantity" type="number" className="form-control" placeholder="Number" disabled />
                                            </div>
                                        </div>
                                        <div className="col-md-10">
                                            <div className="form-group">
                                                <label>Input Product code</label>
                                                <input id="productcode" type="text" className="form-control" placeholder="Code-container" />
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <button type="button" id="btnnhapinput" className="btn btn_nhap btn-block btn-success btn-lg">Input</button>
                                        </div>
                                    </div>
                                </form>
                                <hr></hr>
                                <ShowListOB />
                                {/* <ShowListIB ref={componentRef} listinput={data} container={containerbowl.codecontainervalidate} bowl={containerbowl.bowl} /> */}
                                <div style={{ float: "right" }} className="row">
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
                                            <input type="text" className="form-control form-control-lg" placeholder="Bill of lading code" ref={inputbill} />
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