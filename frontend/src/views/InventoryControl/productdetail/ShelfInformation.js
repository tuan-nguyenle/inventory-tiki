import { React, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import * as ICAPI from "../../../services/ICAPI";
import {
    FaSearch
} from "react-icons/fa";
import Productinshelf from "../modalIC/Productinshelf";
const ShelfInformation = () => {

    const [shelf, setShelf] = useState(null)
    const [locshelf, setLocshelf] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                let getshelf = await ICAPI.getallshelf();
                setShelf(getshelf)
            } catch (error) {
                setShelf(null)
            }
        })();
    }, [])
    useEffect(() => {
        if (shelf && shelf.length > 0) {
            let filteredShelves = Object.values(shelf).filter(obj => obj.shelf_code.length > 3);

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
    }, [shelf])
    console.log(shelf);
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
                                            <th>Shelf Row</th>
                                            <th>Shelf</th>
                                            <th style={{ width: "10%" }}>Extends</th>
                                        </tr>
                                    </thead>
                                    <tbody id="datarow">
                                        {
                                            locshelf && locshelf.length > 0 && locshelf.map((data, i) => {
                                                return (
                                                    <tr style={{ cursor: "pointer" }} key={data._id}>
                                                        <td>{i + 1}</td>
                                                        <td>{data.shelf_code.slice(0, 2)}</td>
                                                        <td>{data.shelf_code}</td>
                                                        <td>
                                                            <Productinshelf data={data} />
                                                        </td>
                                                    </tr>
                                                )
                                            })}
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