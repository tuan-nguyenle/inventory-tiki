import React from "react";

const User = () => {

    return (
        <div className="AccountUser_body" >
            <div className="Container-accountuser">
                <div>
                    <h1 style={{ textAlign: "center" }}>Information</h1>
                </div>
                <hr></hr>
                <div className="row">
                    <div className="col-lg-12 col-md-6 col-sm-6">
                        <h3>
                            <center>Change Password </center>
                        </h3>
                        <div>
                            <form encType="multipart/form-data">
                                <div className="card--GV">
                                    <div className="card-body ">
                                        <div className="d-flex">
                                            <div className="left-info col-lg-3 col-md-12 col-sm-12">
                                                <div className="avatar-wrapper">
                                                    <p><a href="#"><img id="avatar" className="profile-pic" src="./data/avatar/Upload2022102432407df_user.png" /></a></p>
                                                    <input className="file-upload" id="upfile" type="file" name="avatar" />
                                                </div>
                                                <p id="fileerror">
                                                </p>
                                            </div>
                                            <div className="right-info col-lg-9 col-md-12 col-sm-12">
                                                <ul>
                                                    <li className="list-inline">
                                                        <div className="form-group row">
                                                            <label className="col-sm-3 col-form-label">
                                                                <h5>Mật Khẩu cũ: </h5>
                                                            </label>
                                                            <div className="col-sm-8">
                                                                <input type="password" className="form-control" name="pass" id="pass" value="" />
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="list-inline">
                                                        <div className="form-group row">
                                                            <label className="col-sm-3 col-form-label">
                                                                <h5>Mật Khẩu mới: </h5>
                                                            </label>
                                                            <div className="col-sm-8">
                                                                <input type="password" className="form-control" name="txtMatKhau" id="txtMatKhau" value="" />
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="list-inline">
                                                        <div className="form-group row">
                                                            <label className="col-sm-3 col-form-label">
                                                                <h5>Nhập Lại Mật Khẩu : </h5>
                                                            </label>
                                                            <div className="col-sm-8">
                                                                <input type="password" className="form-control" name="txtMatKhau2" id="txtMatKhau2" value="" />
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="list-inline mt-8">
                                                        <center><button name="saveInfo" type="submit" className="btn btn-success">Lưu Thông Tin</button></center>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default User;