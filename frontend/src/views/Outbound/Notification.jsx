import React, { useEffect } from "react";
import { FaSearch, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "../../styles/inbound.scss";
import { Link } from "react-router-dom";
import billlist from "./listoutbound.json";
import InputExcel from "../InputExcel";
// import * as IBAPI from "../../services/IBAPI";

let DataIB = "";
const Notification = () => {
    const getdata = (a) => {
        DataIB = a;
        console.log(DataIB);
    }
    // useEffect(() => {
    //     let notifi = IBAPI.getNotication();
    //     // tạo một usestate rồi lưu vào đó
    //     // rồi dưới return .map
    // }, [])

    return (
        <div className="container_notification">
            <div>
                <h1 style={{ textAlign: "center" }} >Notification OutBound</h1>
            </div>
            <hr></hr>
            <div className="row">
                <div className="col-md-3">
                    <a href="compose.html" className="btn btn-primary btn-block mb-3">Compose</a>

                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Folders</h3>
                        </div>
                        <div className="card-body p-0">
                            <ul className="nav nav-pills flex-column">
                                <li className="nav-item active">
                                    <a href="#" className="nav-link">
                                        <i className="fas fa-inbox"></i> Inbox
                                        <span className="badge bg-primary float-right">12</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="far fa-envelope"></i> Sent
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="far fa-trash-alt"></i> Trash
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Labels</h3>

                        </div>
                        <div className="card-body p-0">
                            <ul className="nav nav-pills flex-column">
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="far fa-circle text-danger"></i>
                                        Important
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="far fa-circle text-warning"></i> Promotions
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="far fa-circle text-primary"></i>
                                        Social
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="card card-primary card-outline">
                        <div className="card-header">
                            <h3 className="card-title">Inbox</h3>

                            <div className="card-tools">
                                <div className="input-group input-group-sm">
                                    <input type="text" className="form-control" placeholder="Search Mail" />
                                    <div className="input-group-append">
                                        <div className="btn btn-primary">
                                            <i className="fas"><FaSearch /></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            <div className="mailbox-controls">
                                <div className="float-right">
                                    01-10/02
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-default btn-sm">
                                            <i className="fas"><FaAngleLeft /></i>
                                        </button>
                                        <button type="button" className="btn btn-default btn-sm">
                                            <i className="fas"><FaAngleRight /></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive mailbox-messages">
                                <table className="table table-hover table-striped">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="icheck-primary">
                                                    <input type="checkbox" value="" id="check1" />
                                                    <label htmlFor="check1"></label>
                                                </div>
                                            </td>
                                            <td className="mailbox-star"><a href="#"><i className="fas fa-star text-warning"></i></a></td>
                                            <td className="mailbox-name">BOSS</td>
                                            <td className="mailbox-subject"><b>DTI36229896659</b>  - {<Link to="/MainOB/Outboundlist" state={billlist} > Create inbound this container</Link>}
                                            </td>
                                            <td className="mailbox-attachment"></td>
                                            <td className="mailbox-date">5 mins ago</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="card-footer p-0">
                            <div className="mailbox-controls">
                                <div className="float-right">
                                    01-10/02
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-default btn-sm">
                                            <i className="fas"><FaAngleLeft /></i>
                                        </button>
                                        <button type="button" className="btn btn-default btn-sm">
                                            <i className="fas"><FaAngleRight /></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <InputExcel getdata={getdata} />
            </div>
        </div >
    );
};
export default Notification;
