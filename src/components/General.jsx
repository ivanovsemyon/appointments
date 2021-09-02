import Header from "./Header";

const General = () => {
  return (
    <>
      <Header title="Приемы" isRenderLogout />
      <main className="general-appointments">
        <form>
          <div className="wrapper">
            <label className="general-appointments_label">Имя:</label>
            <input type="text" className="general-appointments_input" />
          </div>
          <div className="wrapper">
            <label className="general-appointments_label">Врач:</label>
            <input type="text" className="general-appointments_input" />
          </div>
          <div className="wrapper">
            <label className="general-appointments_label">Дата:</label>
            <input type="text" className="general-appointments_input" />
          </div>
          <div className="wrapper">
            <label className="general-appointments_label">Жалобы:</label>
            <input type="text" className="general-appointments_input" />
          </div>
          <button className="general-appointments_button">Добавить</button>
        </form>
        <div className="tablets">
          <div className="tablets_header">
            <h3>Имя</h3>
            <h3>Врач</h3>
            <h3>Дата</h3>
            <h3>Жалобы:</h3>
            <div className="tablets_main">{}</div>
          </div>
        </div>
      </main>
    </>
  );
};

export default General;
