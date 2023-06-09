import React, { useState, useEffect } from "react";
import "../../styles/inbound.scss";
// import PDF from "../../components/PDF";
const ShowReback = React.forwardRef((props, ref) => {
    const data = props.reback; // bắt props
    const codecontainer = props.container;
    const orderid = props.orderid;
    // Lấy ngày
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = day + "/" + month + "/" + year;
    return (
        < div className="ShowlistIB_body" ref={ref} >
            <div className="row">
                <div style={{ marginTop: "20px" }} >
                    <p>Công ty TNHH hai thành viên ĐT Inventory</p>
                    <p>Địa chỉ: 566 Nguyễn Thái Sơn, Quận Gò Vấp, Thành Phố Hồ Chí Minh</p>
                    <h2 style={{ textAlign: "center" }} >List Rebacks</h2>
                    <h3 style={{ textAlign: "center" }} >Code Container: {codecontainer}</h3>
                    <h3 style={{ textAlign: "center" }} >Reback_ID: {orderid}</h3>
                </div>
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
                                        <th>SKU</th>
                                        <th>Quantity</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data && data.length > 0 && data.map((data, i) => {
                                            return (
                                                <tr key={i++}>
                                                    <td>{i + 1}</td>
                                                    <td>{data.bar_code}</td>
                                                    <td style={{ maxWidth: "200px", wordBreak: "break-all", whiteSpace: "pre-wrap" }}>{data.product_name}</td>
                                                    <td>{data.supplier_name}</td>
                                                    <td>{data.category}</td>
                                                    <td>{data.sku}</td>
                                                    <td style={{ color: "red" }}>{data.quantity}</td>
                                                    <td>{newdate}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});
export default ShowReback;