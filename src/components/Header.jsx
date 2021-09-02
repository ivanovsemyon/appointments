import logo from "../icons/Logo.svg";

const Header = ({ title, isRenderLogout }) => {
  return (
    <header className="main_header">
      <img src={logo} alt="Logo healing" className="header_logo" />
      <h1 className="header_label">{title}</h1>
      {isRenderLogout && (
        <button className="header_logout-button">Выход</button>
      )}
    </header>
  );
};

export default Header;
