import React, { useEffect, useState } from "react";
import { getRentCompanies } from "../../Api/DashboardApi";
import "./style.css";

export default function RepairKitchenTableDashboard() {
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
    </tr>
  ));
  return (
    <div className="containerChart">
      Оборудование в ремонте
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th>Название</th>
            <th>Контактное лицо</th>
            <th>Последнее используемое мместо</th>
          </tr>
        </thead>
        <tbody>
          {generateRentCompaniesItem()}
        </tbody>
      </table>
    </div>
  );
}
