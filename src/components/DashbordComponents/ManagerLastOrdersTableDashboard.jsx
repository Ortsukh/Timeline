import React, { useEffect, useState } from "react";
import moment from "moment";
import { getOrders } from "../../Api/DashboardApi";
import "./style.css";
import { getStatusComponent } from "../../common/GenerateElementsData";

export default function ManagerLastOrdersTableDashboard({ id }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders(id).then((response) => {
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
        <td>{item.equipment}</td>
        {getStatusComponent(item.status)}
        <td className="moneyCell">{roundedPrice(item.price)}</td>
        <td className="moneyCell">{roundedPrice(item.price)}</td>
      </tr>
    ));
    return arrayOrders.filter((_, ind) => ind < 5);
  };
  const handleLinkToTimeLine = () => {
    const { origin } = window.location;
    const { pathname } = window.location;
    window.location.replace(`${origin}${pathname}?page=timeline`);
  };
  return (
    <div className="containerChart last-orders">
      <div className="orderTableHeader">
        <h4 className="title-table"> Последние заказы</h4>
        <button type="button" className="lesseeCell btn btn-info" onClick={handleLinkToTimeLine}>{"Timeline->"}</button>
      </div>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th>№</th>
            <th>Дата</th>
            <th>Оборудование</th>
            <th>Статус</th>
            <th>Сумма</th>
            <th>Остаточная стоимость</th>
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
