import logo from "../icons/Logo.svg";
import { useHistory } from "react-router-dom";

const Header = ({ title, isRenderLogout, setIsLogin }) => {
  const history = useHistory();
  const onLogout = () => {
    history.push("/login");
    localStorage.clear();
  };
  return (
    <header className="main_header">
      <img src={logo} alt="Logo healing" className="header_logo" />
      <h1 className="header_label">{title}</h1>
      {isRenderLogout && (
        <button className="header_logout-button" onClick={() => onLogout()}>
          Выход
        </button>
      )}
    </header>
  );
};

export default Header;
