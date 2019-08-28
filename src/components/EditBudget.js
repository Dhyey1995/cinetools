import React from 'react';
import Axios from 'axios';
class EditBudget extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            budgetId:this.props.match.params.id,
            projectName:'',brand_manager:'',camera_assistant:'',director:'',email:'',dop:'',
        };
    }

    componentWillMount(){
        Axios.get("https://betasite.online/laravelAPI/api/budget/"+this.state.budgetId)
            .then(({ data }) => {
                let budgets = data.data;
                this.setState({
                    projectName: budgets.project_name,
                    dop:budgets.Dop,
                    brand_manager:budgets.brand_manager,
                });
                console.log(budgets);
        });

    }


    render() {
        return (
            <h1>hello</h1>
        );
    }
}

export default EditBudget ;
