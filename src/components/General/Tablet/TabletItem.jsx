import { useState } from "react";

import EditAppointment from "./EditAppointment";
import DeleteAppointments from "./DeleteAppointments";
import trash from "../../../icons/Trash.svg";
import pencil from "../../../icons/Pencil.svg";
import host from "../../../utils/host";

import axios from "axios";

const TabletItem = ({
  id,
  name,
  doctor,
  date,
  complaint,
  doctors,
  setAppointments,
}) => {
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);

  const deleteAppointment = async () => {
    await axios.delete(host(`deleteAppointments?id=${id}`)).then((result) => {
      setAppointments(result.data);
    });
  };

  return (
    <div className="tablet-row">
      <div className="tablet-row_item name">{name}</div>
      <div className="tablet-row_item doctor">{doctor}</div>
      <div className="tablet-row_item date">{date}</div>
      <div className="tablet-row_item complaint">{complaint}</div>
      <div className="tablet-row_item_button_wrapper">
        <button
          className="tablet-row_item_button"
          onClick={() => setIsModalDelete(true)}
        >
          <img src={trash} alt="trash" />
        </button>
        <button
          className="tablet-row_item_button"
          onClick={() => setIsModalEdit(true)}
        >
          <img src={pencil} alt="pencil" />
        </button>
      </div>
      {isModalDelete && (
        <DeleteAppointments
          setIsModalDelete={setIsModalDelete}
          deleteAppointment={deleteAppointment}
        />
      )}
      {isModalEdit && (
        <EditAppointment
          name={name}
          doctor={doctor}
          date={date}
          complaint={complaint}
          doctors={doctors}
          id={id}
          setIsModalEdit={setIsModalEdit}
          setAppointments={setAppointments}
        />
      )}
    </div>
  );
};

export default TabletItem;
