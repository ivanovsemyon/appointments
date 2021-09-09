import axios from "axios";
import baseRoute from "../utils/baseRoute";

export const loginUser = (login, password, setIsLogin, history) => {
  axios
    .post(baseRoute("loginUser"), {
      login: login,
      password: password,
    })
    .then((result) => {
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", login);
      setIsLogin(true);
      history.push("/general");
    });
};

export const registrationUser = (
  login,
  password,
  repeatPassword,
  setIsLogin,
  setError,
  error,
  history
) => {
  axios
    .post(baseRoute("registrationUser"), {
      login: login,
      password: password,
      repeatPassword: repeatPassword,
    })
    .then((result) => {
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("user", login);
      setIsLogin(true);
      history.push("/general");
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
        console.log("Введены некорректные данные");
      }
    });
};

export const tokenVerify = (setIsLogin) => {
  axios
    .post(baseRoute("verify"), {
      token: localStorage.getItem("token"),
      user: localStorage.getItem("user"),
    })
    .then((result) => {
      setIsLogin(result.data.isLogin);
    });
};
