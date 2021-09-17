import style from "./Button.module.scss";

const Button = ({
  className,
  label,
  height,
  border = "1px solid rgba(0, 0, 0, 0.2)",
  background = "#ffffff",
  fontSize,
  margin,
  disabled,
  onClick,
}) => {
  const styleProps = {
    height: height,
    border: border,
    background: background,
    fontSize: fontSize,
    margin: margin,
  };
  console.log(disabled);
  return (
    <button
      style={styleProps}
      className={`${style.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
export default Button;
