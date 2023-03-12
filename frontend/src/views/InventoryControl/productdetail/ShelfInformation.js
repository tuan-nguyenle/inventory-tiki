import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import {
    FaSearch
} from "react-icons/fa";
import UpdateQuantity from "./UpdateQuantity";
const ShelfInformation = () => {
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
                    <input type="text" className="form-control" placeholder="Ex: A12B1" aria-label="Recipient's username" aria-describedby="basic-addon2" />
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
                                            <th>Quantity</th>
                                            <th style={{ width: "250px" }}>Extends</th>
                                        </tr>
                                    </thead>
                                    <tbody id="datarow">
                                        <tr>
                                            <td>1</td>
                                            <td>A12B1</td>
                                            <td>Thùng tu vít 2 đầu thùng 300 cái</td>
                                            <td>20</td>
                                            <td>
                                                {edit ?
                                                    <>
                                                        {/* {data.id === item.id && */}
                                                        <div style={{ padding: "0px", }}>
                                                            < div style={{ display: "flex" }}>
                                                                <div style={{ paddingRight: "5px", paddingLeft: "0px" }} className="col-sm-7 col-md-7">
                                                                    <input type="text" className="form-control" value="20" />
                                                                </div>
                                                                <div style={{ paddingLeft: "1px" }} className="col-sm-5 col-md-5">
                                                                    {/* <Button variant="success" onClick={changeIconedit}>Save</Button> */}
                                                                    <UpdateQuantity changechild={changechild} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* } */}
                                                    </>
                                                    :
                                                    <div>
                                                        <Button variant="warning" onClick={changeIconedit}>Update Quantity</Button>
                                                    </div>

                                                }
                                            </td>
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
export default ShelfInformation;