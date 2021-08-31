import domain from "../icons/Domain.svg";
import { useState } from "react";

const Registration = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  return (
    <main className="registration_content">
      <img src={domain} alt="Domain" className="registration_domain-image" />
      <div className="form-container">
        <h2 className="form_label">Регистрация</h2>
        <form className="registration-form">
          <label className="form_input-container">
            <span className="form_text">Login:</span>
            <input
              type="text"
              placeholder="Login"
              className="form_input"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </label>
          <label className="form_input-container">
            <span className="form_text">Password:</span>
            <input
              type="password"
              placeholder="Password"
              className="form_input"
            />
          </label>
          <label className="form_input-container">
            <span className="form_text">Repeat password:</span>
            <input
              type="password"
              placeholder="Password"
              className="form_input"
            />
          </label>
          <button className="form_button">Зарегистрироваться</button>
        </form>
        <a className="link-to-authorization">Авторизоваться</a>
      </div>
    </main>
  );
};

export default Registration;
