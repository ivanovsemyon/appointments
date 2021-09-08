import { useState } from "react";

import arrow from "../../../icons/Arrow-bottom.svg";
import calendar from "../../../icons/Calendar.svg";

import { DatePicker, Select } from "antd";

import style from "./GeneralForm.module.scss";
import {
  createAppointment,
  getAllAppointments,
} from "../../../service/service";

const { Option } = Select;

const GeneralForm = ({ setAppointments, doctors }) => {
  const [name, setName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [complaint, setComplaint] = useState("");
  const onSubmitNewAppointments = async (e) => {
    e.preventDefault();

    if (name && doctor && date && complaint) {
      await createAppointment(name, doctor, date, complaint);
      setName("");
      setDoctor("");
      setComplaint("");
      getAllAppointments(setAppointments);
    }
  };
  return (
    //Todo: мы же договаривались убрать отсюда форму и отвязаться от евента, если мы дает реакту и стейту контролировать значения.
    <form
      className={style.general_form}
      onSubmit={(e) => onSubmitNewAppointments(e)}
    >
      <div className={style.form_input_wrapper}>
        <label className={style.general_appointments_label}>Имя:</label>
        <input
          type="text"
          className={style.general_appointments_input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={style.form_input_wrapper}>
        <label className={style.general_appointments_label}>Врач:</label>
        <Select
          className="general-form-select"
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
      <div className={style.form_input_wrapper}>
        <label className={style.general_appointments_label}>Дата:</label>
        <DatePicker
          className="general-form-datepicker"
          suffixIcon={<img src={calendar} alt="calendar" />}
          placeholder=""
          onChange={(date) => setDate(date)}
        />
      </div>
      <div className={style.form_input_wrapper}>
        <label className={style.general_appointments_label}>Жалобы:</label>
        <input
          type="text"
          className={style.general_appointments_input}
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
        />
      </div>
      <button
        className={style.general_appointments_button}
        disabled={!name || !doctor || !date || !complaint}
      >
        Добавить
      </button>
    </form>
  );
};

export default GeneralForm;
