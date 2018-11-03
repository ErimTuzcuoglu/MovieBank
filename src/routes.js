import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import film_details from './view/pages/FilmDetails';
import celeb_details from './view/pages/CelebDetails';
import SignUp from './view/pages/SignUp';
import App from './App';
import Trends from './view/pages/Trends';
import Upcoming from './view/pages/Upcoming';


const ReactRouter = () => {

    return (
        <Router>
            <div>
                <Route exact path="/" component={App} />
                <Route path="/film-detail" component={film_details} />
                <Route path="/celeb-detail" component={celeb_details} />
                <Route path="/signup" component={SignUp} />
                <Route path="/trends" component={Trends} />
                <Route path="/upcoming" component={Upcoming} />
            </div>
        </Router>
    );
}


export default ReactRouter;