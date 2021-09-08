import { useState } from "react";

import calendar from "../../../icons/Calendar.svg";
import deleteFilter from "../../../icons/DeleteFilter.svg";

import { DatePicker } from "antd";
import { filter, inRange } from "lodash";

import style from "./FilterMenu.module.scss";

const FilterMenu = ({
  isAddFilter,
  setAppointments,
  initialState,
  setIsAddFilter,
}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const filterAppointments = () => {
    setAppointments(initialState);
    if (startDate && !endDate) {
      setAppointments(
        filter(initialState, (o) => o.date >= startDate.format("YYYY-MM-DD"))
      );
    } else if (endDate && !startDate) {
      setAppointments(
        filter(initialState, (o) => o.date <= endDate.format("YYYY-MM-DD"))
      );
    } else if (startDate && endDate) {
      setAppointments(
        filter(initialState, (o) =>
          inRange(
            o.date.split("-").join(""),
            +startDate.format("YYYYMMDD"),
            +endDate.format("YYYYMMDD") + 1
          )
        )
      );
    }
  };

  return (
    isAddFilter && (
      <div className={style.filter_wrapper}>
        <p className={style.filter_text}>с:</p>
        <DatePicker
          className="filter_datepicker"
          suffixIcon={<img src={calendar} alt="calendar" />}
          placeholder=""
          onChange={(date) => setStartDate(date)}
        />
        <p className={style.filter_text}>по:</p>
        <DatePicker
          className="filter_datepicker"
          suffixIcon={<img src={calendar} alt="calendar" />}
          placeholder=""
          onChange={(date) => setEndDate(date)}
        />
        <button className={style.btn_filtered} onClick={filterAppointments}>
          Фильтровать
        </button>
        <button
          className={style.btn_delete_filter}
          onClick={() => {
            setAppointments(initialState);
            setIsAddFilter(false);
          }}
        >
          <img src={deleteFilter} alt="delete-filter" />
        </button>
      </div>
    )
  );
};

export default FilterMenu;
