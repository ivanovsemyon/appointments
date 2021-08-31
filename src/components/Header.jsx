import logo from "../icons/Logo.svg";

const Header = () => {
  return (
    <header className="main_header">
      <img src={logo} alt="Logo healing" className="header_logo" />
      <h1 className="header_label">Зарегистрироваться в системе</h1>
    </header>
  );
};

export default Header;
