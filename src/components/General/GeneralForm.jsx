import { useState } from "react";

import arrow from "../../icons/Arrow-bottom.svg";
import calendar from "../../icons/Calendar.svg";
import host from "../../utils/host";

import axios from "axios";
import { DatePicker, Select } from "antd";

const { Option } = Select;

const GeneralForm = ({ setAppointments, doctors }) => {
  const [name, setName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [complaint, setComplaint] = useState("");
  const onSubmitNewAppointments = async (e) => {
    e.preventDefault();
    if (name && doctor && date && complaint) {
      await axios.post(host("createAppointment"), {
        name: name,
        doctor: doctor,
        date: date.format("YYYY-MM-DD"),
        complaint: complaint,
      });
      setName("");
      setDoctor("");
      setComplaint("");
      axios.get(host("general")).then((result) => {
        setAppointments(result.data);
      });
    }
  };
  return (
    <form className="general_form" onSubmit={(e) => onSubmitNewAppointments(e)}>
      <div className="form_input-wrapper">
        <label className="general-appointments_label">Имя:</label>
        <input
          type="text"
          className="general-appointments_input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form_input-wrapper">
        <label className="general-appointments_label">Врач:</label>
        <Select
          value={doctor}
          suffixIcon={<img src={arrow} alt="arrow-down" />}
          onChange={(value) => setDoctor(value)}
        >
          {doctors.map((item, index) => (
            <Option value={item} key={index}>
              {item}
            </Option>
          ))}
        </Select>
      </div>
      <div className="form_input-wrapper">
        <label className="general-appointments_label">Дата:</label>
        <DatePicker
          suffixIcon={<img src={calendar} alt="calendar" />}
          placeholder=""
          onChange={(date) => setDate(date)}
        />
      </div>
      <div className="form_input-wrapper">
        <label className="general-appointments_label">Жалобы:</label>
        <input
          type="text"
          className="general-appointments_input"
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
        />
      </div>
      <button
        className="general-appointments_button"
        disabled={!name || !doctor || !date || !complaint}
      >
        Добавить
      </button>
    </form>
  );
};

export default GeneralForm;
