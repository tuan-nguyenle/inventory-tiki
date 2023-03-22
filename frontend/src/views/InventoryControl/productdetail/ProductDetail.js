import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import {
    FaSearch
} from "react-icons/fa";
import UpdateQuantity from "./UpdateQuantity";
const ProductDetail = () => {
    const [edit, setEdit] = useState(false);
    const changeIconedit = () => setEdit(!edit);
    const changechild = () => {
        setEdit(!edit)
        toast.success("Add Success"); // in thông báo
    }
    return (
        <>
            <div className="shelfinformation_body">
                <div className="search input-group col-md-6">
                    <input type="text" className="form-control" placeholder="Ex: Barcode or Product Name" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <Button variant="primary"><FaSearch /></Button>
                    </div>
                </div>
                <div>
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body table-responsive p-0">
                                <table className="table table-hover text-nowrap">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Shelf</th>
                                            <th>Product Name</th>
                                            <th>Product Code</th>
                                            <th>Supplier</th>
                                            <th>Category</th>
                                            <th>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody id="datarow">
                                        <tr>
                                            <td>1</td>
                                            <td>A12B1</td>
                                            <td>Thùng tu vít 2 đầu thùng 300 cái</td>
                                            <td>005668956995</td>
                                            <td>1</td>
                                            <td>Dụng cụ</td>
                                            <td>20</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}
export default ProductDetail;