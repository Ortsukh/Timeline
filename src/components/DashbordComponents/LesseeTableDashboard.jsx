import React, { useEffect, useState } from "react";
import { getRentCompanies } from "../../Api/DashboardApi";
import "./style.css";

export default function LesseeTableDashboard() {
  const [rentCompanies, setRentCompanies] = useState([]);
  useEffect(() => {
    getRentCompanies().then((response) => {
      setRentCompanies(response.data);
    });
  }, []);

  const handleLinkToLessee = (id) => {
    console.log(window.location);
    const { origin } = window.location;
    window.location.replace(`${origin}?page=lessee_dashboard&id=${id}`);
  };

  const generateRentCompaniesItem = () => rentCompanies.slice(0, 5).map((item, index) => (
    <tr key={item.name + index.toString()}>
      <td className="lesseeCell" onClick={() => handleLinkToLessee(item.company.id)}>
        {item.company.name
        || "Компания"}
      </td>
      <td>{item.company.contactPerson || "Олег"}</td>
      <td>{item.balance}</td>
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
