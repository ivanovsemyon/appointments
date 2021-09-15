import { useCallback } from "react";

import calendar from "../../icons/Calendar.svg";
import deleteFilter from "../../icons/DeleteFilter.svg";

import { DatePicker } from "antd";

import style from "./FilterMenu.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  appointmentsFilter,
  appointmentsSort,
  isFiltered,
  setEndDate,
  setFiltered,
  setStartDate,
} from "../../redux/appointmentSlice";

const FilterMenu = () => {
  const dispatch = useDispatch();
  const isAddFilter = useSelector(isFiltered);

  const filterAppointments = useCallback(() => {
    dispatch(appointmentsFilter());
  }, [dispatch]);

  return (
    isAddFilter && (
      <div className={style.filter_wrapper}>
        <p className={style.filter_text}>с:</p>
        <DatePicker
          className="filter_datepicker"
          suffixIcon={<img src={calendar} alt="calendar" />}
          placeholder=""
          onChange={(date) => {
            date !== null
              ? dispatch(setStartDate(date.format("YYYY-MM-DD")))
              : dispatch(setStartDate(""));
          }}
        />
        <p className={style.filter_text}>по:</p>
        <DatePicker
          className="filter_datepicker"
          suffixIcon={<img src={calendar} alt="calendar" />}
          placeholder=""
          onChange={(date) => {
            date !== null
              ? dispatch(setEndDate(date.format("YYYY-MM-DD")))
              : dispatch(setEndDate(""));
          }}
        />
        <button className={style.btn_filtered} onClick={filterAppointments}>
          Фильтровать
        </button>
        <button
          className={style.btn_delete_filter}
          onClick={() => {
            dispatch(setFiltered(false));
            dispatch(setStartDate(""));
            dispatch(setEndDate(""));
            dispatch(appointmentsSort());
          }}
        >
          <img src={deleteFilter} alt="delete-filter" />
        </button>
      </div>
    )
  );
};

export default FilterMenu;
