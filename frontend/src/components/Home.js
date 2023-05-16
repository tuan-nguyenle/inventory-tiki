import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "../styles/home.scss";
import avatar from "../assets/images/inventory2.jpg";
import { FaEnvelope, FaHardHat, FaGuitar, FaBed } from "react-icons/fa";

const Home = () => {
    const [value, onChange] = useState(new Date());
    return (
        <div className='Home_body'>
            <div className='container-home'>
                <div>
                    <h1 style={{ textAlign: "center" }}>Home Page</h1>
                </div>
                <hr></hr>
                <div className="row">
                    <div className="col-md-3 col-sm-6 col-12">
                        <div className="info-box">
                            <span className="info-box-icon bg-info"><i className='far'><FaEnvelope /></i></span>

                            <div className="info-box-content">
                                <span className="info-box-text">Work</span>
                                <span className="info-box-number">90%</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-12">
                        <div className="info-box">
                            <span className="info-box-icon bg-success"><i className="far"> <FaHardHat /></i></span>

                            <div className="info-box-content">
                                <span className="info-box-text">Eat</span>
                                <span className="info-box-number">3%</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-12">
                        <div className="info-box">
                            <span className="info-box-icon bg-warning"><i className="far"><FaBed /></i></span>

                            <div className="info-box-content">
                                <span className="info-box-text">Sleep</span>
                                <span className="info-box-number">3%</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-12">
                        <div className="info-box">
                            <span className="info-box-icon bg-danger"><i className="far"><FaGuitar /></i></span>

                            <div className="info-box-content">
                                <span className="info-box-text">Play</span>
                                <span className="info-box-number">1%</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-12">
                        <div style={{ display: 'flex', width: '100%' }}>
                            <Calendar onChange={onChange} value={value} style={{ width: '100%' }} />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <img src={avatar} alt="Avatar" />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Home;