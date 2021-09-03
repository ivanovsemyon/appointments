import trash from "../icons/Trash.svg";
import pencil from "../icons/Pencil.svg";

const TabletItem = ({ name, doctor, date, complaint }) => {
  return (
    <div className="tablet-row">
      <div className="tablet-row_item name">{name}</div>
      <div className="tablet-row_item doctor">{doctor}</div>
      <div className="tablet-row_item date">{date}</div>
      <div className="tablet-row_item complaint">{complaint}</div>
      <div className="tablet-row_item_button_wrapper">
        <button className="tablet-row_item_button">
          <img src={trash} alt="trash" />
        </button>
        <button className="tablet-row_item_button">
          <img src={pencil} alt="pencil" />
        </button>
      </div>
    </div>
  );
};

export default TabletItem;