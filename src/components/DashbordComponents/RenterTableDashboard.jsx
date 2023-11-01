import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRentCompanies } from "../../Api/DashboardApi";
import "./style.css";

export default function RenterTableDashboard() {
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
      <h4 className="title-table">Арендаторы</h4>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th>Название</th>
            <th>Контактное лицо</th>
            <th>Пространство</th>
          </tr>
        </thead>
        <tbody>
          {generateRentCompaniesItem()}
        </tbody>
      </table>
      <Link rel="stylesheet" href="#s">
        Посмотеть всех арендаторов
      </Link>
    </div>
  );
}
