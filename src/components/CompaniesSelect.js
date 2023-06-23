import React from "react";
import Select from "react-select";
import "./style.css";

export default function CompaniesSelect(props) {
  // const chengeSearch = (e) => {
  //   onInputChange(e.value);
  // };
  console.log(props);
  const getOptionsForSearch = (companies) => {
    return companies.map((companie) => {
      return { value: companie.name, label: companie.name };
    });
  };

  return (
    <div className="tools-filter">
      <span> выбрать компанию</span>

      <Select
        options={getOptionsForSearch(props.companies)}
        // onChange={chengeSearch}
      />
      <button className="clear-button" onClick={console.log(123)}>
        clear
      </button>
    </div>
  );
}
