import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import Header from "../Header";
import GeneralForm from "./GeneralForm";
import TabletItem from "./Tablet/TabletItem";
import host from "../../utils/host";
import arrow from "../../icons/Arrow-bottom.svg";
import deleteFilter from "../../icons/DeleteFilter.svg";
import addFilter from "../../icons/AddFilter.svg";

import axios from "axios";
import { DatePicker, Select } from "antd";
import { orderBy, filter, inRange } from "lodash";
import calendar from "../../icons/Calendar.svg";

const { Option } = Select;

const doctors = [
  "Иванов Иван Иванович",
  "Петров Петр Петрович",
  "Сидров Сидр Сидорович",
  "Семенов Семен Семенович",
];

const listOfFields = [
  { name: "name", value: "Имя" },
  { name: "doctor", value: "Врач" },
  { name: "date", value: "Дата" },
  { name: "none", value: "Сбросить" },
];

const ordersSort = [
  { order: "asc", value: "По возрастанию" },
  { order: "desc", value: "По убыванию" },
];

const General = ({ isLogin, setIsLogin }) => {
  const [initialState, setInitialState] = useState(null);
  const [appointments, setAppointments] = useState(null);
  const [fieldSort, setFieldSort] = useState("");
  const [orderBySort, setOrderBySort] = useState("");
  const [isAddFilter, setIsAddFilter] = useState(false);
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);

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
  }, [setIsLogin]);

  useEffect(() => {
    axios.get(host("general")).then((result) => {
      setInitialState(result.data);
      setAppointments(result.data);
    });
  }, []);

  const selectFieldSortBy = (value, order = "asc") => {
    if (value.toLowerCase() === "none") {
      setFieldSort("");
      return setAppointments(initialState);
    }
    setFieldSort(value);
    setOrderBySort(order);
    setAppointments(orderBy(appointments, value, order));
  };

  const filterAppointments = () => {
    setAppointments(initialState);
    if (date1 && !date2) {
      setAppointments(
        filter(initialState, (o) => o.date >= date1.format("YYYY-MM-DD"))
      );
    } else if (date2 && !date1) {
      setAppointments(
        filter(initialState, (o) => o.date <= date2.format("YYYY-MM-DD"))
      );
    } else if (date1 && date2) {
      setAppointments(
        filter(initialState, (o) =>
          inRange(
            o.date.split("-").join(""),
            date1.format("YYYYMMDD"),
            +date2.format("YYYYMMDD") + 1
          )
        )
      );
    }
  };

  return (
    <>
      {!isLogin && <Redirect to="/login" />}
      <Header title="Приемы" isRenderLogout setIsLogin={setIsLogin} />
      <main className="general-appointments">
        <GeneralForm setAppointments={setAppointments} doctors={doctors} />
        <div className="sort-wrapper">
          <p className="sort-wrapper_text">Сортировать по:</p>
          <Select
            value={fieldSort}
            suffixIcon={<img src={arrow} alt="arrow-down" />}
            onChange={(value) => selectFieldSortBy(value, orderBySort)}
          >
            {listOfFields.map((item, index) => (
              <Option value={item.name} key={index}>
                {item.value}
              </Option>
            ))}
          </Select>
          {fieldSort && (
            <>
              <p className="sort-wrapper_text">Направление:</p>
              <Select
                defaultValue="По возрастанию"
                suffixIcon={<img src={arrow} alt="arrow-down" />}
                onChange={(value) => {
                  selectFieldSortBy(fieldSort, value);
                }}
              >
                {ordersSort.map((item, index) => (
                  <Option value={item.order} key={index}>
                    {item.value}
                  </Option>
                ))}
              </Select>
            </>
          )}
          <div className="add-filter_wrapper">
            <p className="sort-wrapper_text">Добавить фильтр по дате:</p>
            <button
              className="add-filter_btn"
              onClick={() => setIsAddFilter(true)}
            >
              <img src={addFilter} alt="add-filter" />
            </button>
          </div>
        </div>
        {isAddFilter && (
          <div className="filter-wrapper">
            <p className="filter-text">с:</p>
            <DatePicker
              suffixIcon={<img src={calendar} alt="calendar" />}
              placeholder=""
              onChange={(date) => setDate1(date)}
            />
            <p className="filter-text">по:</p>
            <DatePicker
              suffixIcon={<img src={calendar} alt="calendar" />}
              placeholder=""
              onChange={(date) => setDate2(date)}
            />
            <button className="btn-filtered" onClick={filterAppointments}>
              Фильтровать
            </button>
            <button
              className="btn-delete-filter"
              onClick={() => {
                setAppointments(initialState);
                setIsAddFilter(false);
              }}
            >
              <img src={deleteFilter} alt="delete-filter" />
            </button>
          </div>
        )}
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
