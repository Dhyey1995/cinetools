import React, { Component } from 'react'

export default class ModalDelete extends Component {
    constructor(props){
        super(props);
        console.log(props);
    }
    render() {
        return (
            <div className="modal fade" id="#myModal" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">×</button>
                            <h4 className="modal-title">Modal Header</h4>
                        </div>
                        <div className="modal-body">
                            <p>Some text in the modal.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal">cancel</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
