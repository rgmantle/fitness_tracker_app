import axios from 'axios';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import cors from 'cors';

import { Home, Activities, Routines, LoginRegister } from './components';
import { BASE_URL } from './api';

const App = () => {
    const [activities, setActivities] = useState([]);

    return (
        <BrowserRouter>
            <Header />
            <Home />
            <Switch>
                <Route path={"/routines"}>
                    <Routines />
                </Route>
                <Route path={"/myroutines"}>
                    <Routines />
                </Route>
                <Route path={"/activities"}>
                    <Activities activities={activities} setActivities={setActivities} />
                </Route>
                <Route path={"/register"}>
                    <LoginRegister />
                </Route>
                <Route path={"/"} exact>
                    <h3>Welcome to the Fitness Trackr App</h3>
                </Route>
                <Route>
                    <h1>404 Page Not Found</h1>
                </Route>
            </Switch>                    
        </BrowserRouter>
    );
};

ReactDOM.render(<App />, 
    document.getElementById("app"));