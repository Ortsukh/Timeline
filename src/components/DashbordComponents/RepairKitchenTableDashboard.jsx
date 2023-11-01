import React, { useEffect, useState } from "react";
import moment from "moment";
import { getRepairingEquipments } from "../../Api/DashboardApi";
import "./style.css";

export default function RepairKitchenTableDashboard() {
  const [rentCompanies, setRentCompanies] = useState([]);
  useEffect(() => {
    getRepairingEquipments().then((response) => {
      console.log(response);
      setRentCompanies(response);
    });
  }, []);

  const generateRentCompaniesItem = () => rentCompanies.slice(0, 3).map((item) => (
    <tr key={item.name}>
      <td>{item.name}</td>
      <td>{item.kitchenEquipment[0].name}</td>
      <td>В ремонте</td>
      <td>{moment().add(-(Math.floor(Math.random() * 300)), "day").format("DD-MM-YYYY")}</td>
    </tr>
  ));
  return (
    <div className="containerChart">
      <h4 className="title-table"> Оборудование в ремонте</h4>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th>Категория</th>
            <th>Оборудование</th>
            <th>Статус</th>
            <th>Дата ремонта</th>
          </tr>
        </thead>
        <tbody>
          {generateRentCompaniesItem()}
        </tbody>
      </table>
    </div>
  );
}
