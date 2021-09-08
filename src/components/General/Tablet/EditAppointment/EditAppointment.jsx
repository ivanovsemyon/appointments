import { useState } from "react";

import arrow from "../../../../icons/Arrow-bottom.svg";
import calendar from "../../../../icons/Calendar.svg";
import { editAppointment } from "../../../../service/service";

import { DatePicker, Select } from "antd";
import moment from "moment";

import style from "./EditAppointment.module.scss";

const { Option } = Select;

const EditAppointment = ({
  item,
  doctors,
  setIsModalEdit,
  setAppointments,
}) => {
  const [editName, setEditName] = useState(item.name);
  const [editDoctor, setEditDoctor] = useState(item.doctor);
  const [editDate, setEditDate] = useState(moment(item.date, "YYYY-MM-DD"));
  const [editComplaint, setEditComplaint] = useState(item.complaint);

  const onSubmitEdit = async () => {
    await editAppointment(
      item._id,
      editName,
      editDoctor,
      editDate,
      editComplaint,
      setAppointments
    );
    setIsModalEdit(false);
  };

  return (
    <div className={style.modal_edit_appointment_wrapper}>
      <div className={style.modal_edit_appointment}>
        <h3 className={style.modal_edit_appointment_header}>Изменить прием</h3>
        <div className={style.modal_edit_appointment_form}>
          <div className={style.modal_delete_appointment_input_wrapper}>
            <label>Имя:</label>
            <input
              type="text"
              className={style.modal_edit_appointment_form_input}
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <label>Врач:</label>
            <Select
              className="modal-edit-appointment-select"
              value={editDoctor}
              suffixIcon={<img src={arrow} alt="arrow-down" />}
              onChange={(value) => setEditDoctor(value)}
            >
              {doctors.map((item, index) => (
                <Option value={item} key={index}>
                  {item}
                </Option>
              ))}
            </Select>
            <label>Дата:</label>
            <DatePicker
              className="modal-edit-appointment-datepicker"
              defaultValue={editDate}
              suffixIcon={<img src={calendar} alt="calendar" />}
              placeholder=""
              onChange={(date) => setEditDate(date)}
            />
            <label>Жалобы:</label>
            <textarea
              className={`${style.modal_edit_appointment_form_input} ${style.complaint_input}`}
              value={editComplaint}
              onChange={(e) => setEditComplaint(e.target.value)}
            />
          </div>
          <div className={style.modal_delete_appointment_btn_wrapper}>
            <button
              className={style.modal_delete_appointment_cancel_btn}
              onClick={() => setIsModalEdit(false)}
            >
              Cancel
            </button>
            <button
              className={style.modal_delete_appointment_delete_btn}
              onClick={onSubmitEdit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAppointment;
