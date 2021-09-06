import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import domain from "../icons/Domain.svg";
import Header from "./Header";

import axios from "axios";

const Login = ({ setIsLogin }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (login && password) {
      await axios
        .post("http://localhost:8000/login", {
          login: login,
          password: password,
        })
        .then((result) => {
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("user", login);
          setIsLogin(true);
          history.push("/general");
        });
    }
  };

  return (
    <>
      <Header title="Войти в систему" />
      <main className="login_content">
        <img src={domain} alt="Domain" className="login_domain-image" />
        <div className="form-container">
          <h2 className="form_label">Войти в систему</h2>
          <form className="registration-form" onSubmit={(e) => onFormSubmit(e)}>
            <label className="form_text">Login:</label>
            <input
              type="text"
              className="form_input"
              placeholder="Login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <label className="form_text">Password:</label>
            <input
              type="password"
              className="form_input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="form_button">Войти</button>
            <Link className="link-to-login" to="/register">
              Зарегистрироваться
            </Link>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;
