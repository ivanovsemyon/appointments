import axios from "axios";
import baseRoute from "../utils/baseRoute";

export const loginUser = async (login, password, setIsLogin, history) => {
  await axios
    .post(baseRoute("login"), {
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

export const registrationUser = async (
  login,
  password,
  repeatPassword,
  setIsLogin,
  setError,
  error,
  history
) => {
  await axios
    .post(baseRoute("register"), {
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

export const getAllAppointments = (setAppointments, setInitialState) => {
  axios.get(baseRoute("general")).then((result) => {
    setAppointments(result.data);
    if (setInitialState) {
      setInitialState(result.data);
    }
  });
};

export const createAppointment = async (name, doctor, date, complaint) => {
  await axios.post(baseRoute("createAppointment"), {
    name: name,
    doctor: doctor,
    date: date.format("YYYY-MM-DD"),
    complaint: complaint,
  });
};

export const editAppointment = async (
  id,
  editName,
  editDoctor,
  editDate,
  editComplaint,
  setAppointments
) => {
  await axios
    .post(baseRoute("editAppointment"), {
      _id: id,
      name: editName,
      doctor: editDoctor,
      date: editDate.format("YYYY-MM-DD"),
      complaint: editComplaint,
    })
    .then((result) => {
      setAppointments(result.data);
    });
};

export const deleteAppointment = async (id, setAppointments) => {
  await axios
    .delete(baseRoute(`deleteAppointments?id=${id}`))
    .then((result) => {
      setAppointments(result.data);
    });
};
