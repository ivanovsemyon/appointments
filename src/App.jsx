import { Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import Registration from "./components/Registration";

import "./App.scss";

const App = () => {
  return (
    <div className="main_container">
      <Switch>
        <Route path="/register">
          <Registration />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
