import React, { useEffect, useState } from "react";
import { getRentCompanies } from "../../Api/DashboardApi";
import "./style.css";

export default function LesseeRentalZoneTableDashboard() {
  const [rentCompanies, setRentCompanies] = useState([]);
  useEffect(() => {
    getRentCompanies().then((response) => {
      setRentCompanies(response.data);
    });
  }, []);

  const generateRentCompaniesItem = () => rentCompanies.slice(0, 5).map((item, index) => (
    <tr key={item.name + index.toString()}>
      <td>
        {item.company.name
                    || "Компания"}
      </td>
      <td>{item.company.contactPerson || "Олег"}</td>
      <td>{item.balance}</td>
    </tr>
  ));
  return (
    <div className="containerChart">
      <h4 className="title-table">Арендованные зоны</h4>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th>№</th>
            <th>Название</th>
            <th>Дата</th>
            <th>Стоимость</th>
            <th>Статус</th>
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
