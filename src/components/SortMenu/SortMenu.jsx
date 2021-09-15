import { useCallback } from "react";

import arrow from "../../icons/Arrow-bottom.svg";
import addFilter from "../../icons/AddFilter.svg";

import { listOfFields, ordersSort } from "./SortMenuConstants";

import { Select } from "antd";

import style from "./SortMenu.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  appointmentsSort,
  setFiltered,
  setOrderBySort,
  setSortField,
  sortField,
} from "../../redux/appointmentSlice";

const { Option } = Select;

const SortMenu = () => {
  const dispatch = useDispatch();
  const isSortField = useSelector(sortField);

  const selectFieldSortBy = useCallback(() => {
    dispatch(appointmentsSort());
  }, [dispatch]);
  return (
    <div className={style.sort_wrapper}>
      <p className={style.sort_wrapper_text}>Сортировать по:</p>
      <Select
        className="sort_wrapper_select"
        suffixIcon={<img src={arrow} alt="arrow-down" />}
        onChange={(value) => {
          dispatch(setSortField(value));
          selectFieldSortBy();
        }}
      >
        {listOfFields.map((item, index) => (
          <Option value={item.name} key={index}>
            {item.value}
          </Option>
        ))}
      </Select>
      {isSortField && (
        <>
          <p className={style.sort_wrapper_text}>Направление:</p>
          <Select
            className="sort_wrapper_select"
            defaultValue="По возрастанию"
            suffixIcon={<img src={arrow} alt="arrow-down" />}
            onChange={(value) => {
              dispatch(setOrderBySort(value));
              selectFieldSortBy();
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
      <div className={style.add_filter_wrapper}>
        <p className={style.sort_wrapper_text}>Добавить фильтр по дате:</p>
        <button
          className={style.add_filter_btn}
          onClick={() => dispatch(setFiltered(true))}
        >
          <img src={addFilter} alt="add-filter" />
        </button>
      </div>
    </div>
  );
};

export default SortMenu;
