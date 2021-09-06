import { useEffect, useState } from "react";

import Header from "./Header";
import TabletItem from "./TabletItem";
import arrow from "../icons/Arrow-bottom.svg";
import calendar from "../icons/Calendar.svg";

import { DatePicker, Select } from "antd";
import axios from "axios";
import { Redirect } from "react-router-dom";

const { Option } = Select;

const General = ({ isLogin, setIsLogin }) => {
  const [appointments, setAppointments] = useState(null);
  const [doctors, setDoctors] = useState([
    "Иванов Иван Иванович",
    "Петров Петр Петрович",
    "Сидров Сидр Сидорович",
    "Семенов Семен Семенович",
  ]);
  const [name, setName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [complaint, setComplaint] = useState("");

  useEffect(() => {
    if (!!localStorage.getItem("token") && localStorage.getItem("user")) {
      axios
        .post("http://localhost:8000/verify", {
          token: localStorage.getItem("token"),
          user: localStorage.getItem("user"),
        })
        .then((result) => {
          setIsLogin(result.data.isLogin);
        });
    } else {
      setIsLogin(false);
    }
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/general").then((result) => {
      setAppointments(result.data);
    });
  }, []);

  const onSubmitNewAppointments = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/createAppointment", {
      name: name,
      doctor: doctor,
      date: date,
      complaint: complaint,
    });
    setName("");
    setDoctor("");
    setDate("");
    setComplaint("");
    axios.get("http://localhost:8000/general").then((result) => {
      setAppointments(result.data);
    });
  };
  return (
    <>
      {!isLogin && <Redirect to="/login" />}
      <Header title="Приемы" isRenderLogout setIsLogin={setIsLogin} />
      <main className="general-appointments">
        <form
          className="general_form"
          onSubmit={(e) => onSubmitNewAppointments(e)}
        >
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
              style={{ width: 188 }}
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
              defaultValue={date}
              suffixIcon={
                <img src={calendar} alt="calendar" placeholder={""} />
              }
              onChange={(date, dateString) => setDate(dateString)}
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
          <button className="general-appointments_button">Добавить</button>
        </form>
        <div className="tablet">
          <div className="tablet_header">
            <h3 className="tablet_header_title name">Имя</h3>
            <h3 className="tablet_header_title doctor">Врач</h3>
            <h3 className="tablet_header_title date">Дата</h3>
            <h3 className="tablet_header_title complaint">Жалобы:</h3>
          </div>
          <div className="tablet_main">
            {appointments &&
              appointments.map((item) => (
                <TabletItem
                  key={item._id}
                  name={item.name}
                  doctor={item.doctor}
                  date={item.date}
                  complaint={item.complaint}
                />
              ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default General;
