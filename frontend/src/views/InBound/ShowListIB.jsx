import React, { useState, useEffect } from "react";
import "../../styles/inbound.scss";
import { toast } from 'react-toastify';

const ShowListIB = React.forwardRef((props, ref) => {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = day + "/" + month + "/" + year;
    const [edit, setEdit] = useState(false);
    const [a, setA] = useState(null);
    const [changesll, setChangesll] = useState({
        quantity: ""
    });
    const changeHandler = async (e, data) => {
        const { id, value } = e.target
        const numericValue = parseFloat(value); // Chuyển đổi giá trị thành số thập phân

        setChangesll(prevState => ({
            ...prevState,
            [id]: numericValue
        }));

        let wait = await props.changequantity(data, numericValue);
        if (wait === 0) {
            setChangesll({ quantity: data.quantity })
        }
    }
    const handleClickOutside = () => {
        setEdit(false);
        setA(null);
        console.log("xóa gòi");
    };
    const activityf = (data) => {
        let id = data.id
        setEdit(true);
        setA(id);
        setChangesll({ quantity: data.quantity })
    }
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
        <div onDoubleClick={handleClickOutside}>
            <div className="card card-default">
                <div className="card-body" >
                    < div className="ShowlistIB_body" ref={ref} >
                        <div className="row">
                            <div style={{ marginTop: "20px" }} >
                                <p>Công ty TNHH hai thành viên ĐT Inventory</p>
                                <p>Địa chỉ: 566 Nguyễn Thái Sơn, Quận Gò Vấp, Thành Phố Hồ Chí Minh</p>
                                <h2 style={{ textAlign: "center" }} >List Products</h2>
                                <h3 style={{ textAlign: "center" }} >Code Container: {codecontainer}&nbsp;&nbsp; ||&nbsp; Pallet: {bowl}</h3>
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
                                                    <th>Quantity</th>
                                                    <th>SKU</th>
                                                    <th>Unit</th>
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
                                                            <tr key={i++}>
                                                                <td>{i + 1}</td>
                                                                <td>{data.bar_code}</td>
                                                                <td style={{ maxWidth: "200px", wordBreak: "break-all", whiteSpace: "pre-wrap" }}>{data.product_name}</td>
                                                                <td>{data.supplier_name}</td>
                                                                <td>{data.category}</td>
                                                                {
                                                                    edit & data.id == a ?
                                                                        <td> <input style={{ maxWidth: "50px" }} type="text" id="quantity" className="form-control" value={changesll.quantity} onChange={(event) => changeHandler(event, data)} /></td>
                                                                        :
                                                                        <td onClick={() => activityf(data)} >{data.quantity}</td>
                                                                }

                                                                <td>{data.sku}</td>
                                                                <td>{data.unit}</td>
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
                        </div >
                    </div >
                </div>
            </div >
        </div>
    )
});
export default ShowListIB;