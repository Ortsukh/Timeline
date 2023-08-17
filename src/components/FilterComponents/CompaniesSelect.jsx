import React, { useState } from "react";
import Select from "react-select";
import "../style.css";

export default function CompaniesSelect({ companies }) {
  const [selectValue, setSelectValue] = useState(null);

  const changeSearch = (e) => {
    setSelectValue(e);
    // onInputChange(e.value);
  };

  const handleReset = () => {
    setSelectValue(null);
    // clearFilter()
  };

  // eslint-disable-next-line max-len
  const getOptionsForSearch = (allCompanies) => allCompanies.map((companie) => ({ value: companie.name, label: companie.name }));

  return (
    <div className="tools-filter">
      <span> Выбрать компанию</span>

      <Select
        className="select-filter"
        options={getOptionsForSearch(companies)}
        onChange={changeSearch}
        value={selectValue}
      />

      <button type="button" className="clear-button" onClick={handleReset}>
        Отчистить
      </button>
    </div>
  );
}
