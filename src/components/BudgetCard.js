import React , { Component } from 'react';
import Userimage from './../images/kayak.png';
class BudgetCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            budgetData:props.children,
        };
    }

    componentDidMount() {
        console.log(this.state.budgetData);

        



    }

    render() {
        return (
            <div className="block-item">
                <div className="budget-head">
                    <h3 className="name-bud">{this.state.budgetData.project_name}</h3>
                    <span>Budget Total - $138270 USD</span>
                    <div className="table_btn action-btns">
                        <a href="#!" className="btn bg-download" data-toggle="tooltip" title="Download PDF"><i className="fas fa-download" /></a>
                        <span><a href="#!" className="btn bg-email" data-toggle="tooltip" title="Email Budget"><i className="fas fa-envelope" /></a></span>
                        <a href="edit.php" className="btn bg-edit" data-toggle="tooltip" title="Edit"><i className="fas fa-pencil-alt" /></a>
                        <a href="edit.php" className="btn bg-view" data-toggle="tooltip" title="View"><i className="fas fa-eye" /></a>
                        <span data-toggle="modal" data-target="#team-details"><a href="#!" className="btn bg-team" data-toggle="tooltip" title="Team Details"><i className="fas fa-users" /></a></span>
                        <span data-toggle="modal" data-target="#message-delete"><a href="javascript:;" className="btn bg-delete" data-toggle="tooltip" title="Delete"> <i className="fas fa-trash-alt" aria-hidden="true" /> </a></span>
                    </div>
                </div>
                <div className="img-sec-info">
                    <div className="img-block">
                        <img src={Userimage} />
                    </div>
                    <div className>
                        <p><span>Country -</span> Germany</p>
                        <p><span>Producers -</span> Tracy Gudwin &amp; Monica De Awis</p>
                        <p><span>Director -</span> Doug Perkul</p>
                    </div>
                    <div className>
                        <p><span>Brand Mananger -</span> James Barker</p>
                        <p><span>Email Address -</span> <a href="mailto:info@gmail.com">info@gmail.com</a></p>
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
            </div>
        );
    }
}
export default BudgetCard ;
