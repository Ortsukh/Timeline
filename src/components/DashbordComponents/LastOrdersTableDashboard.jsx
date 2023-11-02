import React, { useEffect, useState } from "react";
import moment from "moment";
import { getOrders } from "../../Api/DashboardApi";
import "./style.css";

export default function LastOrdersTableDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then((response) => {
      setOrders(response);
    });
  }, []);

  const generateRentCompaniesItem = () => {
    const roundedPrice = (price) => {
      const numPrice = +price;
      return numPrice.toFixed(2);
    };
    const arrayOrders = orders.map((item) => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{moment(item.date).format("D MMM")}</td>
        <td>{item.company}</td>
        <td>{item.equipment}</td>
        <td className="badge badge-success">{item.status}</td>
        <td>{roundedPrice(item.price)}</td>
      </tr>
    ));
    return arrayOrders.filter((_, ind) => ind < 5);
  };

  return (
    <div className="containerChart last-orders">
      <h4 className="title-table"> Последние Заказы</h4>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th>№</th>
            <th>Дата</th>
            <th>Компания</th>
            <th>Оборудование</th>
            <th>Статус</th>
            <th>Цена</th>
          </tr>
        </thead>
        <tbody>
          {generateRentCompaniesItem()}
        </tbody>
      </table>
      {/* <Link rel="stylesheet" href="#s"> */}
      {/*  Посмотеть все заказы */}
      {/* </Link> */}
    </div>
  );
}
