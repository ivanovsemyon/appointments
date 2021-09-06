import { Redirect, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import General from "./components/General";
import Registration from "./components/Registration";

import "antd/dist/antd.css";
import "./App.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));

  return (
    <div className="main_container">
      <Switch>
        <Route path="/register">
          <Registration />
        </Route>
        <Route path="/login">
          <Login setIsLogin={setIsLogin} />
        </Route>
        <Route path="/general">
          <General isLogin={isLogin} setIsLogin={setIsLogin} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
