import React, { useEffect, useState } from "react";
import moment from "moment";
import { getRepairingEquipments } from "../../Api/DashboardApi";
import "./style.css";
import { getStatusComponent } from "../../common/GenerateElementsData";

export default function RepairKitchenTableDashboard() {
  const [rentCompanies, setRentCompanies] = useState([]);
  useEffect(() => {
    getRepairingEquipments().then((response) => {
      console.log(response);
      setRentCompanies(response.data);
    });
  }, []);

  const generateRentCompaniesItem = () => rentCompanies.slice(0, 5).map((item) => (
    <tr key={item.name}>
      <td>{item.name}</td>
      <td>{item.name}</td>
      {getStatusComponent(item.status)}
      <td>{item.updatedAt.date.split(" ")[0]}</td>
    </tr>
  ));
  return (
    <div className="containerChart">
      <h4 className="title-table"> Обновление статса оборудования</h4>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th>Категория</th>
            <th>Оборудование</th>
            <th>Обновление по статусу</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>
          {generateRentCompaniesItem()}
        </tbody>
      </table>
    </div>
  );
}
