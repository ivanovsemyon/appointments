import { useCallback, useState } from "react";

import arrow from "../../icons/Arrow-bottom.svg";
import addFilter from "../../icons/AddFilter.svg";

import { listOfFields, ordersSort } from "./SortMenuConstants";

import { orderBy } from "lodash";
import { Select } from "antd";

import style from "./SortMenu.module.scss";

const { Option } = Select;

const SortMenu = ({
  fieldSort,
  setFieldSort,
  setAppointments,
  initialState,
  appointments,
  setIsAddFilter,
}) => {
  const [orderBySort, setOrderBySort] = useState("asc");

  const selectFieldSortBy = useCallback(
    (value, order) => {
      if (value.toLowerCase() === "none") {
        setFieldSort("");
        return setAppointments(initialState);
      }
      setFieldSort(value);
      setOrderBySort(order);
      setAppointments(orderBy(appointments, value, order));
    },
    [appointments, initialState, setAppointments, setFieldSort]
  );

  return (
    <div className={style.sort_wrapper}>
      <p className={style.sort_wrapper_text}>Сортировать по:</p>
      <Select
        className="sort_wrapper_select"
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
          <p className={style.sort_wrapper_text}>Направление:</p>
          <Select
            className="sort_wrapper_select"
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
      <div className={style.add_filter_wrapper}>
        <p className={style.sort_wrapper_text}>Добавить фильтр по дате:</p>
        <button
          className={style.add_filter_btn}
          onClick={() => setIsAddFilter(true)}
        >
          <img src={addFilter} alt="add-filter" />
        </button>
      </div>
    </div>
  );
};

export default SortMenu;
