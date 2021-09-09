import { useCallback } from "react";

import { deleteAppointment } from "../../services/appointmentsService";

import style from "./DeleteAppointment.module.scss";

const DeleteAppointment = ({ setIsModalDelete, setAppointments, id }) => {
  const onDeleteAppointment = useCallback(() => {
    deleteAppointment(id, setAppointments);
    setIsModalDelete(false);
  }, [id, setAppointments, setIsModalDelete]);
  return (
    <div className={style.modal_delete_appointment_wrapper}>
      <div className={style.modal_delete_appointment}>
        <h3 className={style.modal_delete_appointment_header}>Удалить приём</h3>
        <p className={style.modal_delete_appointment_text}>
          Вы действительно хотите удалить прием?
        </p>
        <div className={style.modal_delete_appointment_btn_wrapper}>
          <button
            className={style.modal_delete_appointment_btn_wrapper_cancel_btn}
            onClick={() => setIsModalDelete(false)}
          >
            Cancel
          </button>
          <button
            className={style.modal_delete_appointment_btn_wrapper_action_btn}
            onClick={onDeleteAppointment}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAppointment;
