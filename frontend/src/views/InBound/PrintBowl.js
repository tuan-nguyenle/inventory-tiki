import React, { useState } from "react";
import Barcode from 'react-barcode';
import { Button } from "react-bootstrap";
const PrintBowl = () => {
    const [barcode, setBarcode] = useState("");
    const [crebarcode, setCrebarcode] = useState("");
    const handlerchange = (e) => {
        setBarcode(e.target.value);
    }
    const create = barcode;
    const createbarcode = (e) => {
        e.preventDefault();
        setCrebarcode("OB-" + barcode);
        setBarcode("")
    }

    return (
        <div className="Printbowl_body">
            <div className="header_print">
                <h1 style={{ textAlign: "center" }} >Print Bowl</h1>
            </div>
            <hr></hr>
            <div className="container_printbowl">
                <form className="form-printbowl">
                    <div className="row">
                        <div className="col-md-11">
                            <div className="form-group">
                                <input maxLength="8" value={barcode} type="text" className="form-control" id="exampleInputEmail1" placeholder="Code-container" onChange={handlerchange} />
                            </div>
                        </div>
                        <div className="col-md-1" >
                            <Button onClick={createbarcode} variant="primary">Create</Button>
                        </div>
                    </div>
                </form>
                <div className="barcode" >
                    <Barcode value={crebarcode.length > 0 && crebarcode ? crebarcode : "000"} />
                </div>
            </div>


        </div>
    )
}
export default PrintBowl;   