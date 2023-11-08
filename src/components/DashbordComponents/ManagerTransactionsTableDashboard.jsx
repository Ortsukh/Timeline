import React from "react";
import "./style.css";
import moment from "moment";

export default function ManagerTransactionsTableDashboard({ transactions }) {
  const generateRentCompaniesItem = () => {
    const roundedPrice = (price) => {
      const numPrice = +price;
      return numPrice.toFixed(2);
    };
    console.log(transactions);
    const arrayTransaction = transactions.map((item, index) => (
      <tr key={item.name + index.toString()}>
        <td>{item.id}</td>
        <td>{item.contract.company.name}</td>
        <td>{moment(item.updatedAt.date).format("D MMM")}</td>
        <td className="moneyCell">{roundedPrice(item.amount)}</td>
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
            <th>Компания</th>
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
