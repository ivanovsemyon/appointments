import { Route, Switch, useHistory } from "react-router-dom";

import Header from "./components/Header";
import Registration from "./components/Registration";

import "./App.scss";
import Login from "./components/Login";

const App = () => {
  const history = useHistory();

  return (
    <div className="main_container">
      <Header
        pageName={
          (history.location.pathname === "/register" &&
            "Зарегистрироваться в системе") ||
          (history.location.pathname === "/login" && "Войти в систему")
        }
      />
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
