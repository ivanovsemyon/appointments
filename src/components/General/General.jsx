import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import Header from "../Header";
import GeneralForm from "./GeneralForm";
import TabletItem from "./Tablet/TabletItem";
import host from "../../utils/host";
import arrow from "../../icons/Arrow-bottom.svg";

import axios from "axios";
import { Select } from "antd";
import { orderBy } from "lodash";

const { Option } = Select;

const General = ({ isLogin, setIsLogin }) => {
  const doctors = [
    "Иванов Иван Иванович",
    "Петров Петр Петрович",
    "Сидров Сидр Сидорович",
    "Семенов Семен Семенович",
  ];
  const listOfFields = [
    { name: "Имя" },
    { doctor: "Врач" },
    { date: "Дата" },
    { none: "None" },
  ];

  const [appointments, setAppointments] = useState(null);
  const [name, setName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [complaint, setComplaint] = useState("");
  const [fieldSort, setFieldSort] = useState("");
  const [orderBySort, setOrderBySort] = useState("По возрастанию");

  useEffect(() => {
    if (!!localStorage.getItem("token") && localStorage.getItem("user")) {
      axios
        .post(host("verify"), {
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
    axios.get(host("general")).then((result) => {
      setAppointments(result.data);
    });
  }, []);

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

  const selectFieldSortBy = (value, order = "asc") => {
    if (value.toLowerCase() === "none") {
      return setFieldSort("");
    }
    setFieldSort(value);
    setAppointments(orderBy(appointments, value, order));
  };

  return (
    <>
      {!isLogin && <Redirect to="/login" />}
      <Header title="Приемы" isRenderLogout setIsLogin={setIsLogin} />
      <main className="general-appointments">
        <GeneralForm
          onSubmitNewAppointments={onSubmitNewAppointments}
          name={name}
          setName={setName}
          doctor={doctor}
          setDoctor={setDoctor}
          doctors={doctors}
          date={date}
          setDate={setDate}
          complaint={complaint}
          setComplaint={setComplaint}
        />
        <div className="sort-wrapper">
          <p className="sort-wrapper_text">Сортировать по:</p>
          <Select
            value={fieldSort}
            suffixIcon={<img src={arrow} alt="arrow-down" />}
            onChange={(value) => selectFieldSortBy(value)}
          >
            {listOfFields.map((item, index) => (
              <Option value={Object.keys(item).toString()} key={index}>
                {item[Object.keys(item).toString()]}
              </Option>
            ))}
          </Select>
          {fieldSort && (
            <>
              <p className="sort-wrapper_text">Направление:</p>
              <Select
                value={orderBySort}
                suffixIcon={<img src={arrow} alt="arrow-down" />}
                onChange={(value) => setOrderBySort(value)}
              >
                <Option value="По возрастанию">По возрастанию</Option>
                <Option value="По убыванию">По убыванию</Option>
              </Select>
            </>
          )}
        </div>
        <div className="tablet">
          <div className="tablet_header">
            <h3 className="tablet_header_title name">Имя</h3>
            <h3 className="tablet_header_title doctor">Врач</h3>
            <h3 className="tablet_header_title date">Дата</h3>
            <h3 className="tablet_header_title complaint">Жалобы:</h3>
          </div>
          <div className="tablet_main">
            {!!appointments?.length &&
              appointments?.map((item) => (
                <TabletItem
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  doctor={item.doctor}
                  date={item.date}
                  complaint={item.complaint}
                  doctors={doctors}
                  setAppointments={setAppointments}
                />
              ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default General;
