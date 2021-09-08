import { useState } from "react";

import EditAppointment from "../EditAppointment/EditAppointment";
import DeleteAppointment from "../DeleteAppointment/DeleteAppointment";

import trash from "../../../../icons/Trash.svg";
import pencil from "../../../../icons/Pencil.svg";

import style from "./TabletItem.module.scss";

const TabletItem = ({ item, doctors, setAppointments }) => {
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);

  return (
    <div className={style.tablet_row}>
      <div className={`${style.tablet_row_item} ${style.name}`}>
        {item.name}
      </div>
      <div className={`${style.tablet_row_item} ${style.doctor}`}>
        {item.doctor}
      </div>
      <div className={`${style.tablet_row_item} ${style.date}`}>
        {item.date}
      </div>
      <div className={`${style.tablet_row_item} ${style.complaint}`}>
        {item.complaint}
      </div>
      <div className={style.tablet_row_item_button_wrapper}>
        <button
          className={style.tablet_row_item_button}
          onClick={() => setIsModalDelete(true)}
        >
          <img src={trash} alt="trash" />
        </button>
        <button
          className={style.tablet_row_item_button}
          onClick={() => setIsModalEdit(true)}
        >
          <img src={pencil} alt="pencil" />
        </button>
      </div>
      {isModalDelete && (
        <DeleteAppointment
          setIsModalDelete={setIsModalDelete}
          setAppointments={setAppointments}
          id={item._id}
        />
      )}
      {isModalEdit && (
        <EditAppointment
          item={item}
          doctors={doctors}
          setIsModalEdit={setIsModalEdit}
          setAppointments={setAppointments}
        />
      )}
    </div>
  );
};

export default TabletItem;
