import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import Header from "../Header";
import GeneralForm from "./GeneralForm";
import SortMenu from "./SortMenu";
import FilterMenu from "./FilterMenu";
import Tablet from "./Tablet/Tablet";
import host from "../../utils/host";

import axios from "axios";

const doctors = [
  "Иванов Иван Иванович",
  "Петров Петр Петрович",
  "Сидров Сидр Сидорович",
  "Семенов Семен Семенович",
];

const General = ({ isLogin, setIsLogin }) => {
  const [initialState, setInitialState] = useState(null);
  const [appointments, setAppointments] = useState(null);
  const [fieldSort, setFieldSort] = useState("");
  const [isAddFilter, setIsAddFilter] = useState(false);

  useEffect(() => {
    if (!!localStorage.getItem("token") && localStorage.getItem("user")) {
      axios
        .post(host("verify"), {
          token: localStorage.getItem("token"),
          user: localStorage.getItem("user"),
        })
        .then((result) => {
          setIsLogin(result.data.isLogin);
        });
    } else {
      setIsLogin(false);
    }
  }, [setIsLogin]);

  useEffect(() => {
    axios.get(host("general")).then((result) => {
      setInitialState(result.data);
      setAppointments(result.data);
    });
  }, []);

  return (
    <>
      {!isLogin && <Redirect to="/login" />}
      <Header title="Приемы" isRenderLogout />
      <main className="general-appointments">
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
