import React, { Component } from 'react';
import Userimage from './../images/user2-160x160.jpg';

class Navbar extends Component {

    render() {
        return (
            <nav className="avbar navbar-static-top">
                <ul className="nav navbar-nav">
                    <li className="active"><a href="index.php">Dashboard</a></li>
                    <li className><a href="my-line-budget.php">My Line Budgets</a></li>
                    <li className><a href="tutorials.php">Tutorials</a></li>
                    <li className><a href="faq.php">FAQ</a></li>
                    <li className><a href="membership.php">Membership</a></li>
                    <li className><a href="contact.php">Contact</a></li>
                </ul>
                <div className="navbar-custom-menu">
                    <ul className="nav navbar-nav">
                        <li className="dropdown user user-menu">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                            <img src={Userimage} className="user-image" alt="User Image" />
                            <span className="hidden-xs">Alexander Pierce</span>
                            </a>
                            <ul className="dropdown-menu">
                                <li className="user-header">
                                    <img src={Userimage} className="img-circle" alt="User Image" />
                                    <p>
                                        Alexander Pierce
                                        <small>Member since Nov. 2012</small>
                                    </p>
                                </li>
                                <li className="user-footer">
                                    <div className="pull-right">
                                        <a href="login.php" className="btn btn-default btn-flat">Sign out</a>
                                    </div>
                                </li>
                            </ul>
                        </li>
                        <li className="dropdown user-details">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                            <i className="fas fa-ellipsis-v" />
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <a href="my-profile.php">My Profile </a>
                                </li>
                                <li>
                                    <a href="my-line-budget.php">My Line Budgets: <span>365</span></a>
                                </li>
                                <li>
                                    <a href>My Team: <span>454</span></a>
                                </li>
                                <li>
                                    <a href="membership.php">Membership Renewal Date: <span>24/02/2019</span></a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar ;
