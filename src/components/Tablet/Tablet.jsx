import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAppointments,
  appointmentsState,
} from "../../redux/appointmentSlice";

import TabletItem from "../TabletItem/TabletItem";

import style from "./Tablet.module.scss";

const Tablet = ({ doctors, setIsLogin }) => {
  const dispatch = useDispatch();
  const appointments = useSelector(appointmentsState);

  useEffect(() => {
    if (
      setIsLogin &&
      !!localStorage.getItem("token") &&
      !!localStorage.getItem("user")
    ) {
      dispatch(getAppointments());
    }
  }, [setIsLogin, dispatch]);

  return (
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
          appointments.map((item) => (
            <TabletItem key={item._id} item={item} doctors={doctors} />
          ))}
      </div>
    </div>
  );
};

export default Tablet;
