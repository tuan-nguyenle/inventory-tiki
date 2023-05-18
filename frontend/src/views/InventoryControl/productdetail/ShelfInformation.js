import { React, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
// import { toast } from 'react-toastify';
import * as ICAPI from "../../../services/ICAPI";
import {
    FaSearch
} from "react-icons/fa";
import Productinshelf from "../modalIC/Productinshelf";
const ShelfInformation = () => {

    const [shelf, setShelf] = useState(null)
    const [locshelf, setLocshelf] = useState([]);
    const [searchshelf, setSearchshelf] = useState([]);

    const [search, setSeach] = useState({
        textsearch: ""
    })
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

    const changeHandler = async (e) => {
        const { id, value } = e.target
        setSeach(prevState => ({
            ...prevState,
            [id]: value
        }
        ))
        if (!value) {
            setSearchshelf(locshelf);
        }
        filterShelfBySearch(value);
    }
    console.log(locshelf);
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
            setSearchshelf(sortedShelves);
        }
    }, [shelf])

    const filterShelfBySearch = (value) => {
        const textsearch = value;
        // Chuyển đổi textsearch thành chuỗi viết thường và loại bỏ khoảng trắng
        const searchValue = textsearch.toLowerCase().trim();

        // Sử dụng hàm filter để lọc các đối tượng có shelf_code giống từng ký tự trong searchValue
        const filteredShelf = locshelf.filter(item => {
            const { shelf_code } = item;
            const shelfCode = shelf_code.toLowerCase();

            return shelfCode.startsWith(searchValue);
        });

        setSearchshelf(filteredShelf);
    };
    return (
        <>
            <div className="shelfinformation_body">
                <div className="search input-group col-md-6">
                    <input type="text" id="textsearch" className="form-control" placeholder="Ex: A1.1" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={changeHandler} />
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
                                            searchshelf && searchshelf.length > 0 && searchshelf.map((data, i) => {
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