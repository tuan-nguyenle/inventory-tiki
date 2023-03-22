import React, { useState } from "react";
import StackedBarChart from "./chart/StackedBarChart"
import MyChart from "./chart/MyChart"
import Button from 'react-bootstrap/Button';
import {
    FaChartPie, FaChartBar
} from "react-icons/fa";
const data = [{
    label: "Số lượng nhập kho", data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 110],
    backgroundColor: "rgba(255, 99, 132, 0.5)",
    borderColor: "rgba(255, 99, 132, 1)",
    borderWidth: 1,
},
{
    label: "Số lượng xuất kho",
    data: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
    backgroundColor: "rgba(54, 162, 235, 0.5)",
    borderColor: "rgba(54, 162, 235, 1)",
    borderWidth: 1,
},
];
const Statistics = () => {
    const [edit, setEdit] = useState(1);
    const change = (a) => {
        setEdit(a);
        console.log(edit);
    }
    return (

        <div className="row">
            <div>
                <div>
                    <h1 style={{ textAlign: "center" }} >Statistics</h1>
                </div>
                <hr></hr>
                <div style={{ float: "right", paddingRight: "10px" }}>
                    <Button style={{ marginRight: "5px" }} variant="outline-secondary" onClick={() => change(1)} ><FaChartBar /></Button>
                    <Button variant="outline-secondary" onClick={() => change(2)} ><FaChartPie /></Button>
                </div>
            </div>
            <div className="col-md-12">
                {
                    edit === 1 ?
                        <div >
                            <h4 style={{ textAlign: "center" }} >Statistical chart between the quantity imported and exported</h4>
                            <StackedBarChart data={data} />
                        </div>
                        :
                        <div >
                            <h4 style={{ textAlign: "center" }} >Warehouse usage chart</h4>
                            <div style={{ height: "60vh" }}>
                                <MyChart />
                            </div>
                        </div>
                }


            </div>
        </div>
    )
}
export default Statistics;