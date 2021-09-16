import { useCallback } from "react";

import { useDispatch } from "react-redux";

import { removeAppointment } from "../../redux/appointmentSlice";

import style from "./ModalDelAppointment.module.scss";

const ModalDelAppointment = ({ id, setIsDeleting }) => {
  const dispatch = useDispatch();

  const deleteAppointment = useCallback(() => {
    dispatch(removeAppointment(id));
    setIsDeleting(false);
  }, [id, dispatch, setIsDeleting]);

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
            onClick={() => setIsDeleting(false)}
          >
            Cancel
          </button>
          <button
            className={style.modal_delete_appointment_btn_wrapper_action_btn}
            onClick={deleteAppointment}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelAppointment;
