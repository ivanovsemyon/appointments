import { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  appointmentsFilterAction,
  appointmentsSortAction,
  isFilteredSlice,
  setStartDateAction,
  setFilteredAction,
  setEndDateAction,
} from "../../redux/appointmentSlice";

import { DatePicker } from "antd";

import calendar from "../../icons/Calendar.svg";
import trash from "../../icons/Trash.svg";

import style from "./FilteringMenu.module.scss";

const FilteringMenu = () => {
  const dispatch = useDispatch();
  const isFiltered = useSelector(isFilteredSlice);

  const filterAppointments = useCallback(() => {
    dispatch(appointmentsFilterAction());
  }, [dispatch]);
  const deleteFilter = useCallback(() => {
    dispatch(setFilteredAction(false));
    dispatch(setStartDateAction(""));
    dispatch(setEndDateAction(""));
    dispatch(appointmentsSortAction());
  });

  return (
    isFiltered && (
      <div className={style.filter_wrapper}>
        <p className={style.filter_text}>с:</p>
        <DatePicker
          className="filter_datepicker"
          suffixIcon={<img src={calendar} alt="calendar" />}
          placeholder=""
          onChange={(date) => {
            date !== null
              ? dispatch(setStartDateAction(date.format("YYYY-MM-DD")))
              : dispatch(setStartDateAction(""));
          }}
        />
        <p className={style.filter_text}>по:</p>
        <DatePicker
          className="filter_datepicker"
          suffixIcon={<img src={calendar} alt="calendar" />}
          placeholder=""
          onChange={(date) => {
            date !== null
              ? dispatch(setEndDateAction(date.format("YYYY-MM-DD")))
              : dispatch(setEndDateAction(""));
          }}
        />
        <button className={style.btn_filtered} onClick={filterAppointments}>
          Фильтровать
        </button>
        <button className={style.btn_delete_filter} onClick={deleteFilter}>
          <img src={trash} alt="delete-filter" />
        </button>
      </div>
    )
  );
};

export default FilteringMenu;
