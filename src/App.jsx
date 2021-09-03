import { Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import General from "./components/General";
import Registration from "./components/Registration";

import "antd/dist/antd.css";
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
        <Route path="/general">
          <General />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
