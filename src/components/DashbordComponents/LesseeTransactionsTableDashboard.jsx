import React, { useEffect, useState } from "react";
import "./style.css";
import moment from "moment";
import { getTransactions } from "../../Api/DashboardApi";

export default function ManagerTransactionsTableDashboard() {
  const [transactions, setTransactions] = useState([]);
  console.log("transactions", transactions);
  useEffect(() => {
    getTransactions().then((response) => {
      setTransactions(response.data);
    });
  }, []);

  const generateRentCompaniesItem = () => {
    const roundedPrice = (price) => {
      const numPrice = +price;
      return numPrice.toFixed(2);
    };
    const arrayTransaction = transactions.map((item, index) => (
      <tr key={item.name + index.toString()}>
        <td>{item.id}</td>
        <td>{moment(item.updatedAt.date).format("D MMM")}</td>
        <td>{roundedPrice(item.amount)}</td>
        <td className="badge badge-success">{item.status}</td>
      </tr>
    ));
    return arrayTransaction.filter((_, ind) => ind < 5);
  };
  return (
    <div className="containerChart">
      <h4 className="title-table">Последние транзакции</h4>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th>№ заказа</th>
            <th>Дата</th>
            <th>Стоимость</th>
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
