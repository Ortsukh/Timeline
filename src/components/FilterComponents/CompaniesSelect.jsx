import React, { useState } from "react";
import Select from "react-select";
import "../style.css";

export default function CompaniesSelect({ companies, setSelectedCompany, isClickedOnConfirm }) {
  const [selectValue, setSelectValue] = useState(null);
  console.log(isClickedOnConfirm);
  const handleChange = (e) => {
    setSelectValue(e);
    setSelectedCompany({
      id: e.value,
      name: e.label,
    });
  };

  // eslint-disable-next-line max-len
  const getOptionsForSearch = (allCompanies) => allCompanies.map((company) => ({
    value: company.id,
    label: company.name,
  }));

  return (
    <div className="tools-filter">
      <span> Выбрать компанию</span>

      <Select
        className="select-filter"
        options={getOptionsForSearch(companies)}
        onChange={handleChange}
        value={selectValue}
      />
      {!selectValue && isClickedOnConfirm && (
        <div className="tooltip">Пожалуйста, выберите компанию</div>
      )}
      {/* <button type="button" className="clear-button" onClick={handleReset}> */}
      {/*  Отчистить */}
      {/* </button> */}
    </div>
  );
}
