import { useState } from "react";

import calendar from "../../icons/Calendar.svg";
import deleteFilter from "../../icons/DeleteFilter.svg";

import { DatePicker } from "antd";
import { filter, inRange } from "lodash";

const FilterMenu = ({
  isAddFilter,
  setAppointments,
  initialState,
  setIsAddFilter,
}) => {
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);

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
    isAddFilter && (
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
    )
  );
};

export default FilterMenu;
