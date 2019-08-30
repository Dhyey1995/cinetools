import React, { Component } from 'react';
import Userimage from './../images/kayak.png';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
class BudgetCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            budgetData: props.children,
            budgetID: props.children.id,
        };
    }
    
    deleteBudget = (event) => {
        console.log(event.target.value);
    }

    render() {
        return (
            <div className="block-item">
                <div className="budget-head">
                    <h3 className="name-bud">{this.state.budgetData.project_name}</h3>
                    <span>Budget Total - $138270 USD</span>
                    <div className="table_btn action-btns">
                        <NavLink to={'/budgetEdit/' + this.state.budgetData.id}><Button variant="primary">Edit</Button></NavLink>
                        <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Delete</button>
                    </div>
                </div>
                <div className="img-sec-info">
                    <div className="img-block">
                        <img src={Userimage} />
                    </div>
                    <div className>
                        <p><span>Country -</span> {this.state.budgetData.country_id}</p>
                        <p><span>Producers -</span> {this.state.budgetData.producers}</p>
                        <p><span>Director -</span> {this.state.budgetData.director}</p>
                    </div>
                    <div className>
                        <p><span>Brand Mananger -</span> {this.state.budgetData.brand_manager}</p>
                        <p><span>Email Address -</span> <a href={this.state.budgetData.email}>{this.state.budgetData.email}</a></p>
                    </div>
                    <div className>
                        <p><span>Pre-Pro Dates -</span> 11/10/17 - 11/12/17</p>
                        <p><span>Shooting Dates -</span> 11/1/18 - 11/4/18</p>
                        <p><span>Post Dates -</span> 11/4/18 - 11/5/18</p>
                    </div>
                </div>
                <div className="bottom-block">
                    <div>
                        <span><strong> Version History -</strong></span>
                        <span><a href="#!">Version 1.0</a></span>
                        <a href="history.php" className="hist">Check Complete History</a>
                    </div>
                    <a className="btn bg-info" data-toggle="modal" data-target="#closing-reason">Mark as Closed</a>
                </div>
                
                <div className="modal fade" id="myModal" role="dialog">
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
                                <button type="button" value={this.state.budgetID} onClick={this.deleteBudget} className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default BudgetCard;
