import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "../styles/home.scss";
import { FaEnvelope, FaHardHat, FaGuitar, FaBed } from "react-icons/fa";

const Home = () => {
    const [value, onChange] = useState(new Date());
    return (
        <div className='Home_body'>
            <div className='container-home'>
                <div>
                    <h1 style={{ textAlign: "center" }}>Làm việc đi</h1>
                </div>
                <hr></hr>
                <div className="row">
                    <div className="col-md-3 col-sm-6 col-12">
                        <div className="info-box">
                            <span className="info-box-icon bg-info"><i className='far'><FaEnvelope /></i></span>

                            <div className="info-box-content">
                                <span className="info-box-text">Làm việc</span>
                                <span className="info-box-number">90%</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-12">
                        <div className="info-box">
                            <span className="info-box-icon bg-success"><i className="far"> <FaHardHat /></i></span>

                            <div className="info-box-content">
                                <span className="info-box-text">Ăn</span>
                                <span className="info-box-number">3%</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-12">
                        <div className="info-box">
                            <span className="info-box-icon bg-warning"><i className="far"><FaBed /></i></span>

                            <div className="info-box-content">
                                <span className="info-box-text">Ngủ</span>
                                <span className="info-box-number">3%</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-12">
                        <div className="info-box">
                            <span className="info-box-icon bg-danger"><i className="far"><FaGuitar /></i></span>

                            <div className="info-box-content">
                                <span className="info-box-text">Chơi</span>
                                <span className="info-box-number">1%</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-6 col-12">
                        <Calendar onChange={onChange} value={value} />
                    </div >
                </div>


            </div>
        </div>
    );
};
export default Home;