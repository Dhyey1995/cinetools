import React, { Component } from 'react';
import axios from 'axios';
import BudgetCard from './../BudgetCard.js';
import Navbar from './../Navbar.js';

class Homepage extends Component {
    constructor(props){
        super(props);
        this.state = {
            budgets:[],
        };
    }
  componentWillMount() {

    axios.get("https://betasite.online/laravelAPI/api/budget")
        .then(({ data }) => { this.setState({
            budgets: data.data
        });
    });


      // fetch('https://betasite.online/laravelAPI/api/budget')
      //     .then(res=> res.json())
      //     .then(({ data }) => {
      //         this.setState({
      //             budgets: data,
      //         })
      //     });


  }

  render() {
    return (
        <body className="hold-transition skin-red sidebar-mini fixed">
    <div className="wrapper">
        <header className="main-header ">
            <a href="index.php" className="logo"><span className="logo-lg"><b>Cine</b>Tools</span></a>
            <Navbar />
        </header>
        <div className="content-wrapper">
            <section className="content-header">
                <h1>Dashboard</h1>
            </section>
            <section className="content">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box">
                            <div className="box-body ">
                                <div className=" ">
                                    <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                        <div className="panel panel-default">
                                            <div className="panel-heading" role="tab" id="headingTwo">
                                                <h4 className="panel-title">
                                                    <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    <i className="more-less glyphicon glyphicon-minus" />
                                                    Pitching
                                                    </a>
                                                </h4>
                                            </div>
                                            <div id="collapseOne" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                                                <div className="panel-body">
                                                    <table id="example1" className="table cinetools-table">
                                                        <thead style={{display: 'none'}}>
                                                        <tr>
                                                            <th>&nbsp;</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.budgets.map(budget => {
                                                                return ( <tr>
                                                                    <td>
                                                                        <BudgetCard>{budget}</BudgetCard>
                                                                    </td>
                                                                </tr> )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</body>
    );
  }
}

export default Homepage;
