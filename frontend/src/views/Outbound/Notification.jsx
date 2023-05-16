import React, { useEffect, useState } from "react";
import { FaSearch, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "../../styles/inbound.scss";
import { Link, useNavigate } from "react-router-dom";
import * as IBAPI from "../../services/IBAPI";
import fakeoutlist from "./fakeoutlist.json"
const Notification = () => {
    const navigate = useNavigate();
    const [allnotifi, setAllnotifi] = useState(null);
    const [notifiun, setNotifiun] = useState(null);
    useEffect(() => {
        (async () => {
            try {
                let notifi = await IBAPI.getNotication();
                setAllnotifi(notifi);
            } catch (error) {
                setAllnotifi(null);
            }

        })();
    }, [])
    useEffect(() => {
        if (allnotifi && allnotifi.length > 0) {
            const uncheckedNotifi = allnotifi.filter((notifi) => notifi.status === "Unchecked" && notifi.order_type === "Warehouse Export");
            setNotifiun(uncheckedNotifi);
        }
    }, [allnotifi])
    return (
        <div className="container_notification">
            <div>
                <h1 style={{ textAlign: "center" }} >Notification</h1>
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
                                        <span className="badge bg-primary float-right"></span>
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
                            <h3 className="card-title">Unchecked</h3>

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
                            <div className="table-responsive mailbox-messages">
                                <table className="table table-hover table-striped">
                                    <tbody>
                                        < tr>
                                            <td>
                                                <div className="icheck-primary">
                                                    <input type="checkbox" value="" id="check1" />
                                                    <label htmlFor="check1"></label>
                                                </div>
                                            </td>
                                            <td className="mailbox-attachment"></td>
                                            <td className="mailbox-name">Inventory management</td>
                                            <td className="mailbox-subject"><b></b>  - {<Link to="/MainOB/OutboundList" state={fakeoutlist} > Create inbound this container</Link>}
                                            </td>
                                            <td className="mailbox-star" style={{ color: "red" }} >New</td>
                                            <td className="mailbox-date"></td>
                                        </tr>
                                        {
                                            notifiun && notifiun.length > 0 && notifiun.map((about) => {
                                                return (
                                                    <tr key={about._id}>
                                                        <td>
                                                            <div className="icheck-primary">
                                                                <input type="checkbox" value="" id="check1" />
                                                                <label htmlFor="check1"></label>
                                                            </div>
                                                        </td>
                                                        <td className="mailbox-attachment">{about._id}</td>
                                                        <td className="mailbox-name">Inventory management</td>
                                                        <td className="mailbox-subject"><b>{about.container_code}</b>  - {<Link to="/MainOB/OutboundList" state={fakeoutlist} > Create inbound this container</Link>}
                                                        </td>
                                                        <td className="mailbox-star" style={{ color: "red" }} >New</td>
                                                        <td className="mailbox-date">{about.createdAt}</td>
                                                    </tr>
                                                )
                                            })
                                        }
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
        </div >
    );
};
export default Notification;

