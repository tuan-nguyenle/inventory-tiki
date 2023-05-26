import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import * as ICAPI from "../../../services/ICAPI";
import {
    FaSearch
} from "react-icons/fa";
const ProductDetail = () => {
    const [datashelf, setDatashelf] = useState(null);
    const [locproduct, setLocProduct] = useState(null);
    const [products, setProducts] = useState(null);
    const [supplierrr, setSupplierrr] = useState(null);
    const [productshow, setProductshow] = useState(null);
    const [supplierrrshow, setSupplierrrshow] = useState(null);
    const [search, setSeach] = useState({
        textsearch: "",
        supplier: "",
    })
    const changeHandler = (e) => {
        const { id, value } = e.target
        setSeach(prevState => ({
            ...prevState,
            [id]: value
        }
        ))
        if (id === "textsearch") {
            filterProductBySearch(value, search.supplier);
        }
        if (id === "supplier") {
            filterProductBySearch(search.textsearch, value);
        }
    }
    const filterProductBySearch = async (value, sup) => {
        const textsearch = value;
        const supp = sup;
        // Chuyển đổi textsearch thành chuỗi viết thường và loại bỏ khoảng trắng
        const searchValue = textsearch.toLowerCase().trim();

        // Sử dụng hàm filter để lọc các đối tượng có product_code bắt đầu bằng searchValue
        if (textsearch) {
            // const filteredShelf = locproduct.filter(item => {
            //     const { bar_code } = item;
            //     const productCode = bar_code.toString(); // Chuyển đổi product_code thành chuỗi để sử dụng hàm startsWith

            //     return productCode.startsWith(searchValue);

            // });
            // setProducts(filteredShelf);
            // Sử dụng vòng lặp forEach để lấy toàn bộ nhà cung cấp có productCode bắt đầu bằng searchValue
            const filteredSuppliers = [];
            if (products, products.length > 0) {
                products.forEach((item) => {
                    const { bar_code, supplier_name } = item;
                    const productCode = bar_code.toString(); // Chuyển đổi productCode thành chuỗi để sử dụng hàm startsWith

                    if (productCode.startsWith(searchValue)) {
                        filteredSuppliers.push(supplier_name);
                    }
                });

                setSupplierrr(filteredSuppliers);
                setSupplierrrshow(filteredSuppliers)
            }
        }
        if (!textsearch) {
            setProducts(locproduct);
            setProductshow(locproduct)
            setSeach({
                textsearch: "",
                supplier: "",
            })
            setSupplierrr(null)
            setSupplierrrshow(null)
        }
        if (supp) {
            // Sử dụng hàm filter để lọc các đối tượng có productCode bắt đầu bằng searchValue và supplier_name === search.supplier
            const filteredShelf = products.filter(item => {
                const { bar_code, supplier_name } = item;
                const productCode = bar_code.toString(); // Chuyển đổi productCode thành chuỗi để sử dụng hàm startsWith

                return productCode.startsWith(searchValue) && supplier_name === supp;
            });
            setProductshow(filteredShelf)
        }
        if (!supp) {
            const filteredShelf = products.filter(item => {
                const { bar_code } = item;
                const productCode = bar_code.toString(); // Chuyển đổi product_code thành chuỗi để sử dụng hàm startsWith

                return productCode.startsWith(searchValue);

            });
            setProductshow(filteredShelf)
            // Sử dụng vòng lặp forEach để lấy toàn bộ nhà cung cấp có productCode bắt đầu bằng searchValue
            const filteredSuppliers = [];
            products.forEach((item) => {
                const { bar_code, supplier_name } = item;
                const productCode = bar_code.toString(); // Chuyển đổi productCode thành chuỗi để sử dụng hàm startsWith

                if (productCode.startsWith(searchValue)) {
                    filteredSuppliers.push(supplier_name);
                }
            });
            setSupplierrrshow(filteredSuppliers);
        }
    };
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
        if (search.textsearch > 12) {
            (async () => {
                try {
                    let a = await ICAPI.searchproduct(search.textsearch, search.supplier);
                    if (a) {
                        let step4 = [];
                        for (let i = 0; i < a.length; i++) {
                            const pkg = a[i];
                            const products = pkg.products.map(product => {
                                return {
                                    ...product,
                                    shelf_code: pkg.shelf_code
                                };
                            });
                            step4.push(...products);
                        }
                        setProducts(step4)
                        setProductshow(step4)
                    }
                } catch (error) {
                    setProducts(null)
                    setProductshow(null)
                }
            })();
        }
    }, [search.textsearch])
    useEffect(() => {
        if (!search.textsearch) {
            setProducts(locproduct);
            setProductshow(locproduct)
            setSeach({
                textsearch: "",
                supplier: "",
            })
        }
    }, [search.textsearch])
    useEffect(() => {
        if (datashelf && datashelf.length > 0) {
            let filteredShelves = Object.values(datashelf).filter(obj => obj.shelf_code.length > 3);

            if (filteredShelves && filteredShelves.length > 0) {
                const haveproduct = filteredShelves.filter((IB) => IB.products.length > 0);
                // setDataleftmau(haveproduct);
                // setDataleft(haveproduct)

                if (haveproduct) {
                    let step4 = [];
                    for (let i = 0; i < haveproduct.length; i++) {
                        const pkg = haveproduct[i];
                        const products = pkg.products.map(product => {
                            return {
                                ...product,
                                shelf_code: pkg.shelf_code
                            };
                        });
                        step4.push(...products);
                    }
                    setLocProduct(step4);
                    setProducts(step4)
                    setProductshow(step4)
                }

            }
        }
    }, [datashelf])
    console.log(locproduct);
    console.log(products);
    console.log(search);
    return (
        <>
            <div className="shelfinformation_body">
                <div className="search input-group col-md-6">
                    <input type="text" id="textsearch" className="form-control" placeholder="Ex: Barcode or Product Name" aria-label="Recipient's username" onChange={changeHandler} aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <Button variant="primary"><FaSearch /></Button>
                    </div>
                    <div className="search input-group col-md-3">
                        <select id="supplier" onChange={changeHandler} className="form-control">
                            <option value="">-- SUPPLIER --</option>
                            {supplierrrshow && supplierrrshow.length > 0 && supplierrrshow.map((data, i) => (
                                <option key={i} value={data}>{data}</option>

                            ))}
                        </select>
                    </div>
                    <div className="search input-group col-md-3">
                        <select id="supplier" onChange={changeHandler} className="form-control">
                            <option value="">-- SKU --</option>
                            <option value="">A4452</option>
                            <option value="">A4223</option>
                        </select>
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
                                            <th>Product code</th>
                                            <th>Product name</th>
                                            <th>Supplier</th>
                                            <th>Category</th>
                                            <th>Quantity</th>
                                            <th>SKU</th>
                                            <th>Unit</th>
                                        </tr>
                                    </thead>
                                    <tbody id="datarow">
                                        {

                                            productshow && productshow.length > 0 && productshow.map((data, i) => {
                                                return (
                                                    <tr key={i++}>
                                                        <td>{i + 1}</td>
                                                        <td>{data.shelf_code}</td>
                                                        <td>{data.bar_code}</td>
                                                        <td style={{ maxWidth: "200px", wordBreak: "break-all", whiteSpace: "pre-wrap" }}>{data.product_name}</td>
                                                        <td>{data.supplier_name}</td>
                                                        <td>{data.category}</td>
                                                        <td>{data.quantity}</td>
                                                        <td>{data.sku}</td>
                                                        <td>{data.unit}</td>
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
            </div >

        </>
    )

}
export default ProductDetail;