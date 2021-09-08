import { useState } from "react";

import arrow from "../../icons/Arrow-bottom.svg";
import addFilter from "../../icons/AddFilter.svg";

import { orderBy } from "lodash";
import { Select } from "antd";

const { Option } = Select;

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

const SortMenu = ({
  fieldSort,
  setFieldSort,
  setAppointments,
  initialState,
  appointments,
  setIsAddFilter,
}) => {
  const [orderBySort, setOrderBySort] = useState("");

  const selectFieldSortBy = (value, order = "asc") => {
    if (value.toLowerCase() === "none") {
      setFieldSort("");
      return setAppointments(initialState);
    }
    setFieldSort(value);
    setOrderBySort(order);
    setAppointments(orderBy(appointments, value, order));
  };

  return (
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
        <button className="add-filter_btn" onClick={() => setIsAddFilter(true)}>
          <img src={addFilter} alt="add-filter" />
        </button>
      </div>
    </div>
  );
};

export default SortMenu;
