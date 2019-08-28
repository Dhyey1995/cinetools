import React , { Component } from 'react';
import { Route } from 'react-router-dom';
import Homepage from './components/Homepage/index.js';
import EditBudget from './components/EditBudget.js';


class App extends Component {
    render() {
        return (
            <section>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/budgetEdit/:id" component={EditBudget} />
            </section>
        );
    }
}

export default App;
