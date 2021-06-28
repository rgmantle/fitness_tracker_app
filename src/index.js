import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Header,
  Activities,
  Routines,
  LoginRegister,
  Home,
} from "./components";

const App = () => {
  const [activities, setActivities] = useState([]);
  const [routines, setRoutines] = useState([]);

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path={"/routines"}>
          <Routines routines={routines} setRoutines={setRoutines}/>
        </Route>
        <Route path={"/myroutines"}>
          <Routines />
        </Route>
        <Route path={"/activities"}>
          <Activities activities={activities} setActivities={setActivities} />
        </Route>
        <Route path={"/loginregister"}>
          <LoginRegister />
        </Route>
        <Route path={"/"} exact>
          <Home />
        </Route>
        <Route>
          <h1>404 Page Not Found</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));