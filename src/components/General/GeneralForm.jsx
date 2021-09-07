import { DatePicker, Select } from "antd";
import arrow from "../../icons/Arrow-bottom.svg";
import calendar from "../../icons/Calendar.svg";

const { Option } = Select;

const GeneralForm = ({
  onSubmitNewAppointments,
  name,
  setName,
  doctor,
  setDoctor,
  doctors,
  date,
  setDate,
  complaint,
  setComplaint,
}) => {
  return (
    <form className="general_form" onSubmit={(e) => onSubmitNewAppointments(e)}>
      <div className="form_input-wrapper">
        <label className="general-appointments_label">Имя:</label>
        <input
          type="text"
          className="general-appointments_input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form_input-wrapper">
        <label className="general-appointments_label">Врач:</label>
        <Select
          value={doctor}
          style={{ width: 188 }}
          suffixIcon={<img src={arrow} alt="arrow-down" />}
          onChange={(value) => setDoctor(value)}
        >
          {doctors.map((item, index) => (
            <Option value={item} key={index}>
              {item}
            </Option>
          ))}
        </Select>
      </div>
      <div className="form_input-wrapper">
        <label className="general-appointments_label">Дата:</label>
        <DatePicker
          defaultValue={date}
          suffixIcon={<img src={calendar} alt="calendar" />}
          placeholder=""
          onChange={(date) => setDate(date)}
        />
      </div>
      <div className="form_input-wrapper">
        <label className="general-appointments_label">Жалобы:</label>
        <input
          type="text"
          className="general-appointments_input"
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
        />
      </div>
      <button
        className="general-appointments_button"
        disabled={!name || !doctor || !date || !complaint}
      >
        Добавить
      </button>
    </form>
  );
};

export default GeneralForm;
