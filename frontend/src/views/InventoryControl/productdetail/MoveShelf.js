import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const MoveShelf = () => {
    return (
        <div className="moveshelf_body">
            <div className="container-moveshelf">
                <h1>Move kệ nào thì nói</h1>
                <div className="card card-default">
                    <div className="card-body">
                        <form>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Input Shelf</label>
                                        <input type="text" className="form-control" placeholder="Ex: A12B4" />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>InPut Code Product</label>
                                        <input type="number" className="form-control" placeholder="Code Product" />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Go To Shelf</label>
                                        <input type="text" className="form-control" placeholder="Ex: A13B1" />
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div>
                            <Button variant="success">Move Product {">>"}</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default MoveShelf;