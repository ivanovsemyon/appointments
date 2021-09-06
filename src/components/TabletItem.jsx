import trash from "../icons/Trash.svg";
import pencil from "../icons/Pencil.svg";
import axios from "axios";
import { useState } from "react";
import EditAppointment from "./EditAppointment";

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
    await axios
      .delete(`http://localhost:8000/deleteAppointments?id=${id}`)
      .then((result) => {
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
        <div className="modal-delete-appointment_wrapper">
          <div className="modal-delete-appointment">
            <h3 className="modal-delete-appointment_header">Удалить приём</h3>
            <p className="modal-delete-appointment_text">
              Вы действительно хотите удалить прием?
            </p>
            <div className="modal-delete-appointment_btn_wrapper">
              <button
                className="modal-delete-appointment_cancel-btn"
                onClick={() => setIsModalDelete(false)}
              >
                Cancel
              </button>
              <button
                className="modal-delete-appointment_delete-btn"
                onClick={() => {
                  deleteAppointment();
                  setIsModalDelete(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
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
