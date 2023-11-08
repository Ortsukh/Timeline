import React from "react";
import "./style.css";

export default function LesseeTableDashboard({ lesseeCompanies }) {
  const handleLinkToLessee = (id) => {
    const { origin } = window.location;
    const { pathname } = window.location;
    window.location.replace(`${origin}${pathname}?page=lessee_dashboard&id=${id}`);
  };
  const generateRentCompaniesItem = () => lesseeCompanies.slice(0, 5).map((item, index) => (
    <tr key={item.name + index.toString()}>
      <td className="lesseeCell" onClick={() => handleLinkToLessee(item.company.id)}>
        {item.company.name
        || "Компания"}
      </td>
      <td>{item.company.contactPerson || "Олег"}</td>
      <td className="moneyCell" style={{ color: item.balance <= 0 ? "red" : "black" }}>
        {item.balance}
      </td>
      <td className="moneyCell">{item.reservedBalance}</td>
    </tr>
  ));
  return (
    <div className="containerChart">
      <h4 className="title-table">Арендаторы</h4>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th>Название</th>
            <th>Контактное лицо</th>
            <th>Баланс</th>
            <th>Забронировано</th>
          </tr>
        </thead>
        <tbody>
          {generateRentCompaniesItem()}
        </tbody>
      </table>
      {/* <a rel="stylesheet" href="#s"> */}
      {/*  Посмотеть всех арендаторов */}
      {/* </a> */}
    </div>
  );
}
