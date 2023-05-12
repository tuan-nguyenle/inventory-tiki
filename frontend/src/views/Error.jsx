import React from "react";

const Error = () => {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center row">
                <div className=" col-md-6">
                    <img src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg" alt="img" className="img-fluid" />
                </div>
                <div className=" col-md-6 mt-5">
                    <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
                    <p className="lead">
                        The page you are looking for does not exist.
                    </p>
                    <a href="/" className="btn btn-primary">Go Home</a>
                </div>

            </div>
        </div>
    )
}
export default Error;