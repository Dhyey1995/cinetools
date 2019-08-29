import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom'
class EditBudget extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            budgetId:this.props.match.params.id,
            projectName:'',brand_manager:'',director:'',email:'',dop:'',
        };
    }

    componentDidMount(){
        Axios.get("https://betasite.online/laravelAPI/api/budget/"+this.state.budgetId)
            .then(({ data }) => {
                let budgets = data.data;
                this.setState({
                    projectName: budgets.project_name,
                    dop:budgets.DOP,
                    brand_manager:budgets.brand_manager,
                    director:budgets.director,
                    email:budgets.email,
                    redirect: false,
                });
                console.log(budgets);
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let data = this.state;
        Axios.patch('https://betasite.online/laravelAPI/api/budget/'+this.state.budgetId,data,{'Content-Type': 'application/x-www-form-urlencoded'})
          .then(respones => {
              if (respones.data.status) {
                  console.log(respones.data.message);
                  // return <Redirect to='/' />
                  this.props.history.push('/')
              } else {
                  console.log(respones.data.message);
              }
        });
    }
    handelInputChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-3"></div>
                    <div className="col-md-6 container">
                        <h2 className="text-center">Edit budget</h2>
                        <form method="POST" onSubmit={this.handleSubmit}>
                          <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" onChange={this.handelInputChange} name="email" className="form-control" value={this.state.email} placeholder="Enter email" />
                          </div>
                          <div className="form-group">
                            <label htmlFor="email">project name:</label>
                            <input type="text" onChange={this.handelInputChange} name="projectName" className="form-control" value={this.state.projectName} />
                          </div>
                          <div className="form-group">
                            <label htmlFor="email">DOP name:</label>
                            <input type="text" onChange={this.handelInputChange} name="dop" className="form-control" value={this.state.dop} />
                          </div>
                          <div className="form-group">
                            <label htmlFor="email">Brand manager name:</label>
                            <input type="text" onChange={this.handelInputChange} name="brand_manager" className="form-control" value={this.state.brand_manager} />
                          </div>
                          <div className="form-group">
                            <label htmlFor="email">Director name:</label>
                            <input type="text" onChange={this.handelInputChange} name="director" className="form-control" value={this.state.director} />
                          </div>
                          <button type="submit" className="btn btn-default">Submit</button>
                        </form>
                      </div>
                  <div className="col-md-3"></div>
              </div>
        );
    }
}

export default EditBudget ;
