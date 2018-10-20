import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import details from './view/pages/details';
import App from './App';

const ReactRouter = () => {

    return (
        <Router>
            <div>
            <Route exact path="/" component={App} />
            <Route path="/details" component={details} />
            </div>
        </Router>
    );
}


export default ReactRouter;