import { useCallback } from "react";
import { useHistory } from "react-router-dom";

import logo from "../../icons/Logo.svg";

import style from "./Header.module.scss";

const Header = ({ title, isRenderLogout }) => {
  const history = useHistory();
  const onLogout = useCallback(() => {
    history.push("/login");
    localStorage.clear();
  }, [history]);

  return (
    <header className={style.main_header}>
      <img src={logo} alt="Logo healing" className={style.header_logo} />
      <h1 className={style.header_label}>{title}</h1>
      {isRenderLogout && (
        <button
          className={style.header_logout_button}
          onClick={() => onLogout()}
        >
          Выход
        </button>
      )}
    </header>
  );
};

export default Header;
