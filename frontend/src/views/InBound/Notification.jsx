import React, { useEffect, useState } from "react";
import { FaSearch, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "../../styles/inbound.scss";
import { Link, useNavigate } from "react-router-dom";
// import DataIB from "../../components/dataIB";
// import DataIB2 from "../../components/dataIB2";
import * as IBAPI from "../../services/IBAPI";
// import MainIB from "../../components/Mainpage/MainIB";

// let DataIB = "";
const Notification = () => {
    const navigate = useNavigate();
    // const getdata = (a) => {
    //     DataIB = a;
    //     console.log(DataIB);
    // }
    const [allnotifi, setAllnotifi] = useState(null);
    const [notifiun, setNotifiun] = useState(null);
    const [notifinote, setNotifinote] = useState(null);
    const DetailReback = async (event, id) => {
        event.preventDefault(); // Ngăn chặn sự kiện mặc định khi click vào link
        try {
            let response = await IBAPI.getDetailReback(id)
            if (response) {
                // console.log(response);
                navigate('/MainIB/InputReback',
                    { state: response });
            }
        } catch (error) {
            alert('Lỗi'); // Thông báo lỗi
            return;
        }
    }
    // console.log(notifidetail);
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
            const uncheckedNotifi = allnotifi.filter((notifi) => notifi.status === "Unchecked" && notifi.order_type === "Warehouse Order");
            setNotifiun(uncheckedNotifi);
        }
    }, [allnotifi])
    useEffect(() => {
        if (allnotifi && allnotifi.length > 0) {
            const notenoughNotifi = allnotifi.filter((notifi) => notifi.status === "Not Enough Stock" && notifi.order_type === "Warehouse Order");
            setNotifinote(notenoughNotifi);
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
                            {/* <div className="mailbox-controls">
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
                            </div> */}
                            <div className="table-responsive mailbox-messages">
                                <table className="table table-hover table-striped">
                                    <tbody>
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
                                                        <td className="mailbox-subject"><b>{about.container_code}</b>  - {<Link to="/MainIB/InboundList" state={about} > Create inbound this container</Link>}
                                                        </td>
                                                        <td className="mailbox-star" style={{ color: "red" }} >New</td>
                                                        <td className="mailbox-date">{about.createdAt}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        {/* <tr>
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
                                        </tr> */}
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
                    <hr></hr>
                    <div className="card card-primary card-outline">
                        <div className="card-header">
                            <h3 className="card-title">Not Enough Stock</h3>

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
                                        {
                                            notifinote && notifinote.length > 0 && notifinote.map((about) => {
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
                                                        <td className="mailbox-subject"><b>{about.container_code}</b>  - {<Link to="#" onClick={(event) => DetailReback(event, about._id)} > Create inbound this container</Link>}
                                                        </td>
                                                        <td className="mailbox-star" style={{ color: "red" }} >Reback</td>
                                                        <td className="mailbox-date">{about.createdAt}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        {/* <tr>
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
                                        </tr> */}
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
            {/* <div>
                <InputExcel getdata={getdata} />
            </div> */}
        </div >
    );
};
export default Notification;
