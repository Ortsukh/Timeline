import React, { useEffect, useState } from "react";
import { getRentCompanies } from "../../Api/DashboardApi";
import "./style.css";

export default function ManagerTransactionsTableDashboard() {
  const [rentCompanies, setRentCompanies] = useState([]);
  useEffect(() => {
    getRentCompanies().then((response) => {
      setRentCompanies(response.data);
    });
  }, []);

  const generateRentCompaniesItem = () => rentCompanies.slice(0, 5).map((item, index) => (
    <tr key={item.name + index.toString()}>
      <td>
        1
      </td>
      <td>Компания</td>
      <td>2</td>
      <td>11.11</td>
      <td>200</td>
      <td className="badge badge-success">Успешно</td>
    </tr>
  ));
  return (
    <div className="containerChart">
      <h4 className="title-table">Последние транзакции</h4>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th>№</th>
            <th>Компания</th>
            <th>№ заказа</th>
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
