import React, { useEffect, useState } from "react";
import { FaSearch, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "../../styles/inbound.scss";
import { Link, useNavigate } from "react-router-dom";
import * as IBAPI from "../../services/IBAPI";
import * as OBAPI from "../../services/OBAPI";
import fakeoutlist from "./fakeoutlist.json"
import ChatGPT from "./GPT/ChatGPT";
const Notification = () => {
    const navigate = useNavigate();
    const [allnotifi, setAllnotifi] = useState(null);
    const [notifiun, setNotifiun] = useState(null);
    const getProduct = async (event, products, order, container) => {
        event.preventDefault(); // Ngăn chặn sự kiện mặc định khi click vào link
        if (products) {
            const a = [];
            products[0].products.forEach(product => {
                const { _id, ...rest } = product;
                a.push(rest);
            });
            if (a) {
                let b = {
                    products: a
                }
                try {
                    let response = await OBAPI.sendproducts(b)
                    if (response) {
                        // Tạo một đối tượng từ điển để lưu trữ các đối tượng theo shelf_code
                        var shelfObjects = {};

                        // Lặp qua mảng "msg" trong đối tượng response
                        response.msg.forEach((item) => {
                            var shelfCode = item.shelves[0].shelf_code;

                            if (!shelfObjects.hasOwnProperty(shelfCode)) {
                                // Nếu shelfCode chưa tồn tại trong shelfObjects, thêm một đối tượng mới
                                shelfObjects[shelfCode] = {
                                    shelf_code: shelfCode,
                                    products: [],
                                };
                            }

                            // Lặp qua mảng "products" trong mỗi phần tử của "msg"
                            item.shelves[0].products.forEach((product) => {
                                // Tìm sản phẩm tương ứng trong biến b
                                var matchingProduct = b.products.find((p) => (
                                    p.bar_code === product.bar_code &&
                                    p.supplier_name === product.supplier_name &&
                                    p.sku === product.sku
                                ));

                                if (matchingProduct) {
                                    var productObj = {
                                        bar_code: parseInt(product.bar_code),
                                        product_name: product.product_name,
                                        category: product.category,
                                        quantity: matchingProduct.quantity, // Sử dụng giá trị quantity từ biến b
                                        supplier_name: product.supplier_name,
                                        sku: product.sku,
                                        unit: product.unit,
                                    };

                                    // Thêm đối tượng product vào mảng products của shelfObject tương ứng
                                    shelfObjects[shelfCode].products.push(productObj);
                                }
                            });
                        });
                        const Handel = {
                            container_code: container,
                            _id: order,
                            shelve: Object.values(shelfObjects)
                        };
                        // const combinedJson = JSON.stringify(data, null, 2);
                        // console.log(Handel);shelfObjects
                        // console.log(shelfObjects);
                        // console.log(response);
                        navigate('/MainOB/OutboundList',
                            { state: Handel });
                    }
                } catch (error) {
                    alert('Lỗi'); // Thông báo lỗi
                    return;
                }
            }
        }
    }
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
                                        {/* < tr>
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
                                        </tr> */}
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
                                                        <td className="mailbox-subject"><b>{about.container_code}</b>  - {<Link to="#" onClick={(event) => getProduct(event, about.packages, about._id, about.container_code)}> Create inbound this container</Link>}
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
                <div className="col-md-12" >
                    <textarea style={{ width: "1000px", height: "100px" }} defaultValue={
                        `"A1A1", "A12B4", "A1A2", "A1A4", "B8A44", "C33A12","A55C22", "B13A2", "B2D54", "C32A12"
                         Tính theo thứ tự từ trái qua phải , là chữ cái thì sắp xếp tăng dần theo alphabet, là số thì xếp theo thứ tự tăng dần
                         Chia danh sách kệ trên thành các list nhỏ, mỗi danh sách gồm tối thiểu 1 kệ và tối đa là 3 kệ `} />
                    <ChatGPT />
                </div>
            </div>

        </div >
    );
};
export default Notification;

{/* <td className="mailbox-subject"><b>{about.container_code}</b>  - {<Link to="/MainOB/OutboundList" state={fakeoutlist} > Create inbound this container</Link>} */ }