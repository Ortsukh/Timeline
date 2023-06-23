import React from "react";
import Select from "react-select";
import "./style.css";
import { orderStatus } from "../constants/constants";

export default function StatusSelect(props) {

  const getOptionsForSearch = (companies) => {
    return companies.map((companie) => {
      return { value: companie.title, label: companie.translate };
    });
  };

  return (
    <div>
      <span> выбрать статус заказа</span>
      <Select
        options={getOptionsForSearch(orderStatus)}
        // onChange={chengeSearch}
      />
    </div>
  );
}
