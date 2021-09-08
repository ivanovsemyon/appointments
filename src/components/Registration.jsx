import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Header from './Header';
import domain from '../icons/Domain.svg';
import passwordRegex from '../utils/registrationUtils';

import axios from 'axios';

const Registration = ({ setIsLogin }) => {
  const history = useHistory();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState({
    login: null,
    password: null,
    repeatPassword: null,
  });

  const submitForm = async (e) => {
    e.preventDefault();
    if (login.length < 6) {
      setError({
        ...error,
        login: 'Длина логина должна быть не менее 6 символов',
      });
    } else if (!validPassword) {
      setError({
        ...error,
        password:
          'Длина пароля должна быть не меньше 6 символов, обязательно состоять из латинских символов и содержать число',
      });
    } else if (password !== repeatPassword) {
      setError({
        ...error,
        repeatPassword: 'Пароли не совпадают',
      });
    } else {
      await axios
        .post('http://localhost:8000/register', {
          login: login,
          password: password,
          repeatPassword: repeatPassword,
        })
        .then((result) => {
          localStorage.setItem('token', result.data.token);
          localStorage.setItem('user', login);
          setIsLogin(true);
          history.push('/general');
        })
        .catch((errorBackend) => {
          if (errorBackend.response.data.login) {
            setError({
              ...error,
              login: errorBackend.response.data.login,
            });
          } else if (errorBackend.response.data.password) {
            setError({
              ...error,
              password: errorBackend.response.data.password,
            });
          } else if (errorBackend.response.data.repeatPassword) {
            setError({
              ...error,
              repeatPassword: errorBackend.response.data.repeatPassword,
            });
          } else {
            console.log('Введены некорректные данные');
          }
        });
    }
  };

  const validPassword = passwordRegex.test(password);

  return (
    <>
      <Header title="Зарегистрироваться в системе" />
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
              onChange={(e) => {
                setLogin(e.target.value);
                setError({ ...error, login: null });
              }}
            />
            <div className="form_error-text">
              {error.login && <p>{error.login}</p>}
            </div>
            <label className="form_text">Password:</label>
            <input
              type="password"
              placeholder="Password"
              className="form_input"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError({ ...error, password: null });
              }}
            />
            <div className="form_error-text">
              {error.password && <p title={error.password}>{error.password}</p>}
            </div>
            <label className="form_text">Repeat password:</label>
            <input
              type="password"
              placeholder="Password"
              className="form_input"
              value={repeatPassword}
              onChange={(e) => {
                setRepeatPassword(e.target.value);
                setError({ ...error, repeatPassword: null });
              }}
            />
            <div className="form_error-text">
              {error.repeatPassword && <p>{error.repeatPassword}</p>}
            </div>
            <button
              className="form_button"
              disabled={
                !(!error.login && !error.password && !error.repeatPassword)
              }
            >
              Зарегистрироваться
            </button>
          </form>
          <Link className="link-to-authorization" to="/login">
            Авторизоваться
          </Link>
        </div>
      </main>
    </>
  );
};

export default Registration;
