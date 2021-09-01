import domain from "../icons/Domain.svg";
import { useState } from "react";
import axios from "axios";

const Registration = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/register", {
      login: login,
      password: password,
    });
    console.log(login, password);
  };

  const passwordRegex = /^(?=.*[\d])[A-Za-z0-9].{5,}$/;
  const validPassword = passwordRegex.test(password);

  return (
    <main className="registration_content">
      <img src={domain} alt="Domain" className="registration_domain-image" />
      <div className="form-container">
        <h2 className="form_label">Регистрация</h2>
        <form className="registration-form" onSubmit={(e) => submitForm(e)}>
          <label className="form_text">Login:</label>
          <input
            type="text"
            placeholder="Login"
            className="form_input"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <div className="form_error-text">
            {login.length >= 6 || login === "" || (
              <p>Логин должен содержать минимум 6 символов</p>
            )}
          </div>
          <label className="form_text">Password:</label>
          <input
            type="password"
            placeholder="Password"
            className="form_input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="form_error-text">
            {validPassword || password === "" || (
              <p
                title="Длина пароля должна быть не меньше 6 символов, обязательно
                состоять из латинских символов и содержать число"
              >
                Длина пароля должна быть не меньше 6 символов, обязательно
                состоять из латинских символов и содержать число
              </p>
            )}
          </div>
          <label className="form_text">Repeat password:</label>
          <input
            type="password"
            placeholder="Password"
            className="form_input"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <div className="form_error-text">
            {password === repeatPassword || repeatPassword === "" || (
              <p>Пароли не совпадают</p>
            )}
          </div>
          <button className="form_button">Зарегистрироваться</button>
        </form>
        <a className="link-to-authorization">Авторизоваться</a>
      </div>
    </main>
  );
};

export default Registration;
