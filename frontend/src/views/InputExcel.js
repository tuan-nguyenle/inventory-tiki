import React, { useState } from "react";
import * as XLSX from 'xlsx/xlsx.mjs';
import { toast } from 'react-toastify';
import { Sendexcel } from "../services/BOSSAPI"
const InputExcel = (props) => {
    const [fileName, setFileName] = useState(null);
    const [newdata, setNewdata] = useState(null);
    const handleFile = async (e) => {
        e.stopPropagation(); e.preventDefault();
        const f = e.target.files[0];
        setFileName(f.name);
        const data = await f.arrayBuffer();
        const workbook = XLSX.read(data);
        const container = workbook.SheetNames; // lấy container name
        const worksheet = workbook.Sheets[container];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        const arr2 = [container[0], ...jsonData.map((item, index) => ({ ...item }))];
        setNewdata(arr2);
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