import React from "react";
import Select from "react-select";
import "./style.css";
import { orderStatus } from "../constants/constants";

export default function StatusSelect(props) {

  const getOptionsForSearch = () => {
    const options = []
   for (let key in orderStatus) {
    console.log(key);
    options. push({ value: orderStatus[key].title, label: orderStatus[key].translate })
   }
   return options
  };

  return (
    <div className="tools-filter">
      <span> Выбрать статус заказа</span>
      <Select className="select-filter"
        options={getOptionsForSearch()}
        // onChange={chengeSearch}
      />
    </div>
  );
}
