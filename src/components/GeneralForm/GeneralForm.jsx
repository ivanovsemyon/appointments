import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { addAppointment } from "../../redux/appointmentSlice";

import arrow from "../../icons/Arrow-bottom.svg";
import calendar from "../../icons/Calendar.svg";

import { DatePicker, Select } from "antd";

import style from "./GeneralForm.module.scss";

const { Option } = Select;

const GeneralForm = ({ doctors }) => {
  const [name, setName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [complaint, setComplaint] = useState("");
  const dispatch = useDispatch();

  const onSubmitNewAppointments = useCallback(() => {
    if (name && doctor && date && complaint) {
      dispatch(addAppointment({ name, doctor, date, complaint }));
      setName("");
      setDoctor("");
      setComplaint("");
    }
  }, [name, doctor, date, complaint, dispatch]);
  return (
    <div className={style.general_form}>
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
        onClick={onSubmitNewAppointments}
      >
        Добавить
      </button>
    </div>
  );
};

export default GeneralForm;
