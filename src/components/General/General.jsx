import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import Header from "../Header/Header";
import GeneralForm from "../GeneralForm/GeneralForm";
import SortMenu from "../SortMenu/SortMenu";
import FilterMenu from "../FilterMenu/FilterMenu";
import Tablet from "../Tablet/Tablet";

import { tokenVerify } from "../../services/usersService";
import { getAllAppointments } from "../../services/appointmentsService";
import { doctors } from "./GeneralConstants";

import style from "./General.module.scss";

const General = ({ isLogin, setIsLogin }) => {
  const [initialState, setInitialState] = useState(null);
  const [appointments, setAppointments] = useState(null);
  const [fieldSort, setFieldSort] = useState("");
  const [isAddFilter, setIsAddFilter] = useState(false);

  useEffect(() => {
    if (!!localStorage.getItem("token") && localStorage.getItem("user")) {
      tokenVerify(setIsLogin);
    } else {
      setIsLogin(false);
    }
  }, [setIsLogin]);

  useEffect(() => {
    if (
      setIsLogin &&
      !!localStorage.getItem("token") &&
      localStorage.getItem("user")
    ) {
      getAllAppointments(setAppointments, setInitialState);
    }
  }, [setIsLogin]);

  return (
    <>
      {!isLogin && <Redirect to="/login" />}
      <Header title="Приемы" isRenderLogout />
      <main className={style.general_appointments}>
        <GeneralForm setAppointments={setAppointments} doctors={doctors} />
        <SortMenu
          fieldSort={fieldSort}
          setFieldSort={setFieldSort}
          setAppointments={setAppointments}
          initialState={initialState}
          appointments={appointments}
          setIsAddFilter={setIsAddFilter}
        />
        <FilterMenu
          isAddFilter={isAddFilter}
          setAppointments={setAppointments}
          initialState={initialState}
          setIsAddFilter={setIsAddFilter}
        />
        <Tablet
          appointments={appointments}
          doctors={doctors}
          setAppointments={setAppointments}
        />
      </main>
    </>
  );
};

export default General;
