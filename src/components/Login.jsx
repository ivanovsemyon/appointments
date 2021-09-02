import { Link } from "react-router-dom";

import domain from "../icons/Domain.svg";

const Login = () => {
  return (
    <main className="login_content">
      <img src={domain} alt="Domain" className="login_domain-image" />
      <div className="form-container">
        <h2 className="form_label">Войти в систему</h2>
        <form className="registration-form">
          <label className="form_text">Login:</label>
          <input type="text" className="form_input" placeholder="Login" />
          <label className="form_text">Password:</label>
          <input type="text" className="form_input" placeholder="Password" />
          <button className="form_button">Войти</button>
          <Link className="link-to-login" to="/register">
            Зарегистрироваться
          </Link>
        </form>
      </div>
    </main>
  );
};

export default Login;
