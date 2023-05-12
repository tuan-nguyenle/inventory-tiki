import React, { useState } from "react";
import * as XLSX from 'xlsx/xlsx.mjs';
import { toast } from 'react-toastify';
import { Sendexcel } from "../services/BOSSAPI"
const InputExcel = (props) => {
    const [fileName, setFileName] = useState(null);
    const [newdata, setNewdata] = useState(null);
    const [drive, setDrive] = useState({
        fullname: "Nguyễn Văn A",
        phone: "05598996663",
        license_plates: "79N3 195-123",
        store_keeper: "Jane Smith"
    });
    const handleFile = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        const f = e.target.files[0];
        setFileName(f.name);
        const data = await f.arrayBuffer();
        const workbook = XLSX.read(data);
        const container = workbook.SheetNames[0]; // lấy container name
        const listPackage = Object.values(workbook.SheetNames.slice(1));
        const order = [];
        await listPackage.forEach((ele) => {
            let packages = {};
            packages.package_code = ele;
            packages.products = XLSX.utils.sheet_to_json(workbook.Sheets[ele]);
            order.push(packages);
        })
        // list 1
        const combinedData = {
            container_code: container,
            deliverer: drive.fullname,
            license_plates: drive.license_plates,
            store_keeper: drive.store_keeper,
            packages: order,
            order_type: "Warehouse Order",
            status: "Unchecked",
            stack_car: false
        };

        // cái này chung
        const combinedJson = JSON.stringify(combinedData, null, 2);
        setNewdata(combinedJson);
    }

    const handledata = async () => {
        // props.getdata(newdata); // xóa cái này bỏ props luôn cả bên notifition nữa
        try {
            await Sendexcel(newdata);
            setNewdata(null);
            setFileName(null);
            toast.success("Send"); // in thông báo
        } catch (error) {
            // console.log(error);
            toast.error("Can't send"); // in thông báo
        }
    }

    return (
        <>
            {/* {fileName && (
                <p>
                    Filename: <span>{fileName}</span>
                </p>
            )} */}
            <h2>Input file excel Inbound Today</h2>
            <input id="dataTransfer" type="file" onChange={(e) => handleFile(e)} />

            <div style={{ marginTop: "20px" }} ><button type="button" className="btn btn-success" onClick={handledata} >Success</button></div>
        </>
    )
}

export default InputExcel;