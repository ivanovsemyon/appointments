import axios from "axios";
import baseRoute from "../utils/baseRoute";

export const getAllAppointments = () => {
  try {
    return axios
      .get(baseRoute("getAllAppointments"))
      .then((result) => result.data);
  } catch (e) {
    console.log(e, "Ошибка");
  }
};

export const createAppointment = (name, doctor, date, complaint) => {
  try {
    return axios
      .post(baseRoute("createAppointment"), {
        name: name,
        doctor: doctor,
        date: date.format("YYYY-MM-DD"),
        complaint: complaint,
      })
      .then((result) => {
        return result.data;
      });
  } catch (e) {
    console.log(e, "Ошибка");
  }
};

export const editAppointment = (id, name, doctor, date, complaint) => {
  try {
    return axios
      .post(baseRoute("editAppointment"), {
        _id: id,
        name: name,
        doctor: doctor,
        date: date.format("YYYY-MM-DD"),
        complaint: complaint,
      })
      .then((result) => result.data);
  } catch (e) {
    console.log(e, "Ошибка");
  }
};

export const deleteAppointment = (id) => {
  try {
    return axios
      .delete(baseRoute(`deleteAppointments?id=${id}`))
      .then((result) => result.data);
  } catch (e) {
    console.log(e, "Ошибка");
  }
};
