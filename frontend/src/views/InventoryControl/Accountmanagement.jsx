import React, { useEffect, useState } from "react";
import axios from "axios"
import { Button } from "react-bootstrap";
import {
    FaTrashAlt
} from "react-icons/fa";
// import data from "./dataaccount.json"
// import data from "./dataaccount2.json"
import AddUser from "./accountmodal/AddUser";
import EditUser from "./accountmodal/EditUser";
import DeleteUser from "./accountmodal/DeleteUser";
import * as IBAPI from "../../services/IBAPI";
const Accountmanagement = () => {
    const [allaccount, setAllaccount] = useState(null);
    const getnewaccount = (getInfo) => {
        console.log("data lấy về", getInfo)
    }
    useEffect(() => {
        (async () => {
            try {
                const getUsers = await IBAPI.getAllAccounts();
                console.log(getUsers);
                if (getUsers) {
                    const UserIB = getUsers.filter((user) => user.departments[0] === "6468949c3a3d0a7a5b4cbf06" && user.roles[0] === "646894543a3d0a7a5b4cbf00");
                    setAllaccount(UserIB);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    // useEffect(() => {
    //     if (allnotifi && allnotifi.length > 0) {
    //         const uncheckedNotifi = allnotifi.filter((notifi) => notifi.status === "Unchecked" && notifi.order_type === "Warehouse Export");
    //         setNotifiun(uncheckedNotifi);
    //     }
    // }, [allnotifi])
    return (
        <>
            <div className="Accountmanagement_body">
                <div className="container_acountmanagement">
                    <div className="Hearder">
                        <div>
                            <h1 style={{ textAlign: "center" }} >Account Management</h1>
                        </div>
                        <div style={{ float: "right" }}>
                            <AddUser getnewaccount={getnewaccount} />
                        </div>
                    </div>
                    <hr></hr>
                    <div>
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body table-responsive p-0">
                                        {
                                            !allaccount ?
                                                <>
                                                    <div>
                                                        <h1 style={{ textAlign: "center" }}>Loading...</h1>
                                                    </div>
                                                </>
                                                :
                                                <table className="table table-hover text-nowrap">
                                                    <thead>
                                                        <tr>
                                                            <th>STT</th>
                                                            <th>Department</th>
                                                            <th>Full Name</th>
                                                            <th>Account</th>
                                                            <th>Phone</th>
                                                            <th style={{ width: "200px" }} >Extends</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            allaccount && allaccount.length > 0 && allaccount.map((data, i) => {
                                                                return (
                                                                    <tr key={data._id}>
                                                                        <td>{i + 1}</td>
                                                                        <td>Inventory-control</td>
                                                                        <td>{data.fullname}</td>
                                                                        <td>{data.username}</td>
                                                                        <td>{data.phone}</td>
                                                                        <td>
                                                                            <div className="Button-extends">
                                                                                <div className="button">
                                                                                    <EditUser />
                                                                                </div>
                                                                                <div className="button">
                                                                                    <DeleteUser />
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )

                                                            }
                                                            )}
                                                    </tbody>
                                                </table>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}
export default Accountmanagement;