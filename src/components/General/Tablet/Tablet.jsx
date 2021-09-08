import TabletItem from "./TabletItem/TabletItem";

import style from "./Tablet.module.scss";

const Tablet = ({ appointments, doctors, setAppointments }) => (
  <div className={style.tablet}>
    <div className={style.tablet_header}>
      <h3 className={`${style.tablet_header_title} ${style.name}`}>Имя</h3>
      <h3 className={`${style.tablet_header_title} ${style.doctor}`}>Врач</h3>
      <h3 className={`${style.tablet_header_title} ${style.date}`}>Дата</h3>
      <h3 className={`${style.tablet_header_title} ${style.complaint}`}>
        Жалобы:
      </h3>
    </div>
    <div className={style.tablet_main}>
      {!!appointments?.length &&
        appointments?.map((item) => (
          //Todo: зачем 6 отдельных пропов, если ты можешь кинут один раз item и внутри компонента его уже деструктуризировать
          <TabletItem
            key={item._id}
            item={item}
            doctors={doctors}
            setAppointments={setAppointments}
          />
        ))}
    </div>
  </div>
);

export default Tablet;
