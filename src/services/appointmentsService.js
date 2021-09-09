import axios from "axios";
import baseRoute from "../utils/baseRoute";

export const getAllAppointments = (setAppointments, setInitialState) => {
  axios.get(baseRoute("getAllAppointments")).then((result) => {
    setAppointments(result.data);
    if (setInitialState) {
      setInitialState(result.data);
    }
  });
};

export const createAppointment = (name, doctor, date, complaint) => {
  axios.post(baseRoute("createAppointment"), {
    name: name,
    doctor: doctor,
    date: date.format("YYYY-MM-DD"),
    complaint: complaint,
  });
};

export const editAppointment = (
  id,
  editName,
  editDoctor,
  editDate,
  editComplaint,
  setAppointments
) => {
  axios
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

export const deleteAppointment = (id, setAppointments) => {
  axios.delete(baseRoute(`deleteAppointments?id=${id}`)).then((result) => {
    setAppointments(result.data);
  });
};
