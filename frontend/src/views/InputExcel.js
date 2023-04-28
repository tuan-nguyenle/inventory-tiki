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
        license_plates: "79N3 195-123"
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
        // console.log(order);
        // const jsonData = {};
        // allsheets.forEach(sheetname => {
        //     const worksheet = workbook.Sheets[sheetname];
        //     jsonData[sheetname] = XLSX.utils.sheet_to_json(worksheet);
        // });
        // console.log(workbook);
        // const jsonData = [];
        // for (let i = 0; i < listPackage.length; i++) {
        //     const sheetName = listPackage[i];
        //     const worksheet = workbook.Sheets[sheetName];
        //     const sheetData = XLSX.utils.sheet_to_json(worksheet);
        //     // console.log(2, sheetData);
        //     jsonData.push(sheetData);
        // }
        // const jsonData = XLSX.utils.sheet_to_json(worksheet);



        // const arr2 = [container[0], ...jsonData.map((item, index) => ({ ...item }))]; // json có thể xử lý
        // setNewdata(arr2);

        // list 1
        const combinedData = {
            container_code: container,
            deliverer: drive.fullname,
            license_plates: drive.license_plates,
            packages: order,
            receipt_type: "Warehouse order",
            status: "Unchecked"
        };

        // cái này chung
        const combinedJson = JSON.stringify(combinedData, null, 2);
        // const combinedJson = combinedData;
        // console.log(combinedJson);
        // const parsedJson = JSON.parse(combinedJson);
        // console.log(parsedJson);
        setNewdata(combinedJson);
        // console.log(combinedJson);
    }

    const handledata = async () => {
        // console.log(newdata);
        props.getdata(newdata); // xóa cái này bỏ props luôn cả bên notifition nữa
        try {
            let wait = Sendexcel(newdata);
            toast.success("Send"); // in thông báo
        } catch (error) {
            throw error;
            // toast.error(error); // in thông báo
        }

    }

    return (
        <>
            {fileName && (
                <p>
                    Filename: <span>{fileName}</span>
                </p>
            )}
            <h2>Input file excel Inbound Today</h2>
            <input id="dataTransfer" type="file" onChange={(e) => handleFile(e)} />

            <div style={{ marginTop: "20px" }} ><button type="button" className="btn btn-success" onClick={handledata} >Success</button></div>
        </>
    )
}

export default InputExcel;