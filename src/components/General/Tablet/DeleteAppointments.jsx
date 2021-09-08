const DeleteAppointments = ({ setIsModalDelete, deleteAppointment }) => (
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
);

export default DeleteAppointments;
