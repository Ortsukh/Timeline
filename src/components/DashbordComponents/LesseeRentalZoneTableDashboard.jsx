import React from "react";
import "./style.css";
import { getStatusComponent } from "../../common/GenerateElementsData";

export default function LesseeRentalZoneTableDashboard({ rentZone }) {
  const generateRentCompaniesItem = () => rentZone.slice(0, 5).map((item, index) => (
    <tr key={item.name + index.toString()}>
      <td>
        {item.id}
      </td>
      <td>{item.contract.marketPlace.kitchensEquipment.name}</td>
      <td>{item.createdAt.date.split(" ")[0]}</td>
      <td>
        {item.totalSum}
      </td>
      { getStatusComponent(item.status)}
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
