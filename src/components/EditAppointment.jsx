import { DatePicker, Select } from "antd";
import arrow from "../icons/Arrow-bottom.svg";
import calendar from "../icons/Calendar.svg";
import { useState } from "react";
import axios from "axios";
import moment from "moment";

const { Option } = Select;

const EditAppointment = ({
  name,
  doctor,
  date,
  complaint,
  doctors,
  id,
  setIsModalEdit,
  setAppointments,
}) => {
  const [editName, setEditName] = useState(name);
  const [editDoctor, setEditDoctor] = useState(doctor);
  const [editDate, setEditDate] = useState(moment(date, "YYYY-MM-DD"));
  const [editComplaint, setEditComplaint] = useState(complaint);

  const editAppointment = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8000/editAppointment", {
        _id: id,
        name: editName,
        doctor: editDoctor,
        date: editDate.format("YYYY-MM-DD"),
        complaint: editComplaint,
      })
      .then((result) => {
        setAppointments(result.data);
      });
    setIsModalEdit(false);
  };

  return (
    <div className="modal-edit-appointment_wrapper">
      <div className="modal-edit-appointment">
        <h3 className="modal-edit-appointment_header">Изменить прием</h3>
        <form
          className="modal-edit-appointment_form"
          onSubmit={(e) => editAppointment(e)}
        >
          <div className="modal-delete-appointment_input_wrapper">
            <label className="modal-edit-appointment_form_label">Имя:</label>
            <input
              type="text"
              className="modal-edit-appointment_form_input"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <label className="modal-edit-appointment_form_label">Врач:</label>
            <Select
              value={editDoctor}
              suffixIcon={<img src={arrow} alt="arrow-down" />}
              onChange={(value) => setEditDoctor(value)}
            >
              {doctors.map((item, index) => (
                <Option value={item} key={index}>
                  {item}
                </Option>
              ))}
            </Select>
            <label className="modal-edit-appointment_form_label">Дата:</label>
            <DatePicker
              defaultValue={editDate}
              suffixIcon={<img src={calendar} alt="calendar" />}
              placeholder=""
              onChange={(date, dateString) => setEditDate(dateString)}
            />
            <label className="modal-edit-appointment_form_label">Жалобы:</label>
            <textarea
              className="modal-edit-appointment_form_input complaint_input"
              value={editComplaint}
              onChange={(e) => setEditComplaint(e.target.value)}
            />
          </div>
          <div className="modal-delete-appointment_btn_wrapper">
            <button
              className="modal-delete-appointment_cancel-btn"
              onClick={() => setIsModalEdit(false)}
            >
              Cancel
            </button>
            <button
              className="modal-delete-appointment_delete-btn"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAppointment;
