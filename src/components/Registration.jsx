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
          <label className="form_text">Login:</label>
          <input
            type="text"
            placeholder="Login"
            className="form_input"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <label className="form_text">Password:</label>
          <input
            type="password"
            placeholder="Password"
            className="form_input"
          />
          <label className="form_text">Repeat password:</label>
          <input
            type="password"
            placeholder="Password"
            className="form_input"
          />
          <button className="form_button">Зарегистрироваться</button>
        </form>
        <a className="link-to-authorization">Авторизоваться</a>
      </div>
    </main>
  );
};

export default Registration;
