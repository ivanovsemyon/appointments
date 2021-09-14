import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import Header from "../Header/Header";
import GeneralForm from "../GeneralForm/GeneralForm";
import SortMenu from "../SortMenu/SortMenu";
import FilterMenu from "../FilterMenu/FilterMenu";
import Tablet from "../Tablet/Tablet";

import { doctors } from "./GeneralConstants";

import { tokenVerify } from "../../services/usersService";

import style from "./General.module.scss";

const General = ({ isLogin, setIsLogin }) => {
  const [fieldSort, setFieldSort] = useState("");
  const [isAddFilter, setIsAddFilter] = useState(false);

  useEffect(() => {
    if (!!localStorage.getItem("token") && !!localStorage.getItem("user")) {
      tokenVerify(setIsLogin);
    } else {
      setIsLogin(false);
    }
  }, [setIsLogin]);

  return (
    <>
      {!isLogin && <Redirect to="/login" />}
      <Header title="Приемы" isRenderLogout />
      <main className={style.general_appointments}>
        <GeneralForm doctors={doctors} />
        <SortMenu
          fieldSort={fieldSort}
          setFieldSort={setFieldSort}
          setIsAddFilter={setIsAddFilter}
        />
        <FilterMenu isAddFilter={isAddFilter} setIsAddFilter={setIsAddFilter} />
        <Tablet doctors={doctors} setIsLogin={setIsLogin} />
      </main>
    </>
  );
};

export default General;
