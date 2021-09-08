import TabletItem from "./TabletItem";

const Tablet = ({ appointments, doctors, setAppointments }) => (
  <div className="tablet">
    <div className="tablet_header">
      <h3 className="tablet_header_title name">Имя</h3>
      <h3 className="tablet_header_title doctor">Врач</h3>
      <h3 className="tablet_header_title date">Дата</h3>
      <h3 className="tablet_header_title complaint">Жалобы:</h3>
    </div>
    <div className="tablet_main">
      {!!appointments?.length &&
        appointments?.map((item) => (
          <TabletItem
            key={item._id}
            id={item._id}
            name={item.name}
            doctor={item.doctor}
            date={item.date}
            complaint={item.complaint}
            doctors={doctors}
            setAppointments={setAppointments}
          />
        ))}
    </div>
  </div>
);

export default Tablet;
