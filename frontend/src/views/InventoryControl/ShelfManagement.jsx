import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../styles/inventorycontrol.scss";
import Button from 'react-bootstrap/Button';
import * as ICAPI from "../../services/ICAPI";
import {
    FaPrint, FaCheck, FaTimes, FaSearch,
} from "react-icons/fa";
import Addshelve from "./modalIC/Addshelve";
import Addshelfrow from "./modalIC/Addshelverow";
const ShelfManagement = () => {
    const [datashelf, setDatashelf] = useState(null);
    const [locshelf, setLocshelf] = useState(null);
    useEffect(() => {
        (async () => {
            try {
                let getshelf = await ICAPI.getallshelf();
                setDatashelf(getshelf)
            } catch (error) {
                setDatashelf(null)
            }
        })();
    }, [])
    useEffect(() => {
        if (datashelf && datashelf.length > 0) {
            let filteredShelves = Object.values(datashelf).filter(obj => obj.shelf_code.length > 3);

            let sortedShelves = filteredShelves.sort((a, b) => {
                const aArr = a.shelf_code.match(/[a-z]+|\d+/gi);
                const bArr = b.shelf_code.match(/[a-z]+|\d+/gi);

                for (let i = 0; i < aArr.length && i < bArr.length; i++) {
                    const aEl = aArr[i];
                    const bEl = bArr[i];

                    if (isNaN(aEl) && isNaN(bEl)) {
                        if (aEl < bEl) return -1;
                        if (aEl > bEl) return 1;
                    } else if (!isNaN(aEl) && !isNaN(bEl)) {
                        return aEl - bEl;
                    } else {
                        return isNaN(aEl) ? 1 : -1;
                    }
                }

                return aArr.length - bArr.length;
            });

            setLocshelf(sortedShelves);
        }
    }, [datashelf])
    return (
        <div className="shelfmanagement_body">
            <div className="container-shelfmanagement">
                <div className="header">
                    <div className="texs">
                        <h1>Shelf Management</h1>
                    </div>

                    <div className="buttoma" style={{ float: "right", cursor: "pointer", marginRight: "20px" }}>
                        <Addshelve />
                        <Addshelfrow />
                    </div>
                </div>
                <hr></hr>
                <div>
                    <div className="search input-group col-md-6">
                        <input type="text" className="form-control" placeholder="Ex: A12B1" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <Button variant="primary"><FaSearch /></Button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body table-responsive p-0">
                                    <table className="table table-hover text-nowrap">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Area</th>
                                                <th>Shelf Row</th>
                                                <th>Shelf</th>
                                                <th style={{ width: "200px" }} >Extends</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* <tr>
                                                <td>1</td>
                                                <td>A</td>
                                                <td>A1A1</td>
                                                <td>
                                                    <Button variant="warning"><span style={{ paddingRight: "5px" }}><FaPrint /></span>Print</Button>{' '}
                                                    <Button variant="danger"><span style={{ paddingRight: "5px" }} ><FaTimes /></span>Delete</Button>{' '}
                                                </td>
                                            </tr> */}
                                            {

                                                locshelf && locshelf.length > 0 && locshelf.map((data, i) => {
                                                    return (
                                                        <tr key={data._id}>
                                                            <td>{i + 1}</td>
                                                            <td>{data.shelf_code.slice(0, 1)}</td>
                                                            {/* <td style={{ maxWidth: "200px", wordBreak: "break-all", whiteSpace: "pre-wrap" }}>{data.product_name}</td> */}
                                                            <td>{data.shelf_code.slice(0, 2)}</td>
                                                            <td>{data.shelf_code}</td>
                                                            <td>
                                                                <Button variant="warning"><span style={{ paddingRight: "5px" }}><FaPrint /></span>Print</Button>{' '}
                                                                <Button variant="danger"><span style={{ paddingRight: "5px" }} ><FaTimes /></span>Delete</Button>{' '}
                                                            </td>
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
            </div>
        </div>
    )
}
export default ShelfManagement;