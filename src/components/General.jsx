import { useEffect, useState } from "react";

import Header from "./Header";
import TabletItem from "./TabletItem";
import arrow from "../icons/Arrow-bottom.svg";
import calendar from "../icons/Calendar.svg";

import { DatePicker, Select } from "antd";
import axios from "axios";

const { Option } = Select;

const General = () => {
  const [appointments, setAppointments] = useState(null);
  const [name, setName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [complaint, setComplaint] = useState("");

  useEffect(async () => {
    await axios
      .get("http://localhost:8000/general")
      .then((result) => setAppointments(result));
  }, []);

  const onSubmitNewAppointments = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/createAppointment", {
      name: name,
      doctor: doctor,
      date: date,
      complaint: complaint,
    });
  };

  return (
    <>
      <Header title="Приемы" isRenderLogout />
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
              {appointments.map((item, index) => (
                <Option value={item.doctor} key={index}>
                  {item.doctor}
                </Option>
              ))}
            </Select>
          </div>
          <div className="form_input-wrapper">
            <label className="general-appointments_label">Дата:</label>
            <DatePicker
              defaultValue={date}
              suffixIcon={
                <img src={calendar} alt="calendar" placeholder={false} />
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
            {appointments.map((item, index) => (
              <TabletItem
                key={index}
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
