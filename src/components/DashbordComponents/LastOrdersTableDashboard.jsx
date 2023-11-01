import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRentCompanies } from "../../Api/DashboardApi";
import "./style.css";

export default function LastOrdersTableDashboard() {
  const [rentCompanies, setRentCompanies] = useState([]);
  useEffect(() => {
    getRentCompanies().then((response) => {
      console.log(response);
      setRentCompanies(response);
    });
  }, []);

  const generateRentCompaniesItem = () => rentCompanies.map((item) => (
    <tr>
      <td>{item.name}</td>
      <td>{item.contactPerson}</td>
      <td>{item.lastPlace}</td>
      <td>{item.lastPlace}</td>
      <td>{item.lastPlace}</td>
    </tr>
  ));
  return (
    <div className="containerChart">
      Последние Заказы
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th>№</th>
            <th>Дата</th>
            <th>Компания</th>
            <th>ОБорудование</th>
            <th>Статус</th>
            <th>Цена</th>
          </tr>
        </thead>
        <tbody>
          {generateRentCompaniesItem()}
        </tbody>
      </table>
      <Link rel="stylesheet" href="#s">
        Посмотеть все заказы
      </Link>
    </div>
  );
}
