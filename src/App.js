import React , { Component } from 'react';
import { Route } from 'react-router-dom';
import Homepage from './components/Homepage/index.js';


class App extends Component {
    render() {
        return (
            <section>
              <Route exact path="/" component={Homepage} />
            </section>
        );
    }
}

export default App;
