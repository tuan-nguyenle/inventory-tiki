import React, { useState, useEffect } from "react";
// import { PDFDownloadLink } from '@react-pdf/renderer';
import "../../styles/inbound.scss";
// import PDF from "../../components/PDF";
const ShowListIB = React.forwardRef((props, ref) => {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = day + "/" + month + "/" + year;
    // var res = JSON.stringify(listinput)
    // const [data, setData] = useState('');
    // useEffect(() => {
    //     (async () => {
    //         let res = JSON.stringify(listinput)
    //         setData(res);
    //         console.log('check data', data);
    //     })();
    // }, []);
    const data = props.listinput; // bắt props
    const codecontainer = props.container;
    const bowl = props.bowl;

    return (
        < div className="ShowlistIB_body" ref={ref} >
            <div className="row">
                <div style={{ marginTop: "20px" }} >
                    <p>Công ty TNHH hai thành viên ĐT Inventory</p>
                    <p>Địa chỉ: 566 Nguyễn Thái Sơn, Quận Gò Vấp, Thành Phố Hồ Chí Minh</p>
                    <h2 style={{ textAlign: "center" }} >List Product</h2>
                    <h3 style={{ textAlign: "center" }} >Code Container: {codecontainer}&nbsp;&nbsp; ||&nbsp; Bowl: {bowl}</h3>
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
                                        <th>Category</th>
                                        <th>Quantity</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* <tr>
                                        <td>1</td>
                                        <td>8938510904063</td>
                                        <td>{newdate}</td>
                                        <td>1</td>
                                    </tr> */}
                                    {

                                        data && data.length > 0 && data.map((data, i) => {
                                            return (

                                                <tr key={data.id}>
                                                    <td>{i + 1}</td>
                                                    <td>{data.productcode}</td>
                                                    <td>{data.productname}</td>
                                                    <td>{data.category}</td>
                                                    <td>{data.quantity}</td>
                                                    <td>{data.date}</td>
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
export default ShowListIB;