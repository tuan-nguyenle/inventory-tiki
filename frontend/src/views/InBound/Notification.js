import React from "react";
import { FaRegWindowMinimize, FaSearch, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "../../styles/inbound.scss";
import { Link } from "react-router-dom";
import DataIB from "../../components/dataIB";
import DataIB2 from "../../components/dataIB2";
const Notification = () => {
    // console.log(DataIB)
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
                                            <td className="mailbox-name">ĐứcSiro</td>
                                            <td className="mailbox-subject"><b>ARADIA887958</b>  - {<Link to="/MainIB/InboundList" state={DataIB} > Create inbound this container</Link>}
                                            </td>
                                            <td className="mailbox-attachment"></td>
                                            <td className="mailbox-date">5 mins ago</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="icheck-primary">
                                                    <input type="checkbox" value="" id="check1" />
                                                    <label htmlFor="check1"></label>
                                                </div>
                                            </td>
                                            <td className="mailbox-star"><a href="#"><i className="fas fa-star text-warning"></i></a></td>
                                            <td className="mailbox-name">ĐứcSiro</td>
                                            <td className="mailbox-subject"><b>ARADIA887960</b>  -  {<Link to="/MainIB/InboundList" state={DataIB2} > Create inbound this container</Link>}
                                            </td>
                                            <td className="mailbox-attachment"></td>
                                            <td className="mailbox-date">5 mins ago</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="icheck-primary">
                                                    <input type="checkbox" value="" id="check1" />
                                                    <label htmlFor="check1"></label>
                                                </div>
                                            </td>
                                            <td className="mailbox-star"><a href="#"><i className="fas fa-star text-warning"></i></a></td>
                                            <td className="mailbox-name">TuânStock</td>
                                            <td className="mailbox-subject"><b>STuan022356899</b>  -  <a href="read-mail.html">Create inbound this container</a>
                                            </td>
                                            <td className="mailbox-attachment"></td>
                                            <td className="mailbox-date">5 mins ago</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="icheck-primary">
                                                    <input type="checkbox" value="" id="check14" />
                                                    <label htmlFor="check14"></label>
                                                </div>
                                            </td>
                                            <td className="mailbox-star"><a href="#"><i className="fas fa-star text-warning"></i></a></td>
                                            <td className="mailbox-name">Dr.strange</td>
                                            <td className="mailbox-subject"><b>STRANGE59968556</b>  -  <a href="read-mail.html">Create inbound this container</a>
                                            </td>
                                            <td className="mailbox-attachment"><i className="fas fa-paperclip"></i></td>
                                            <td className="mailbox-date">14 days ago</td>
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
        </div >
    );
};
export default Notification;
