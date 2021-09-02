import logo from "../icons/Logo.svg";

const Header = ({ pageName }) => {
  return (
    <header className="main_header">
      <img src={logo} alt="Logo healing" className="header_logo" />
      <h1 className="header_label">{pageName}</h1>
    </header>
  );
};

export default Header;
