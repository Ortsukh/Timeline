import React, {useState} from "react";
import Select from "react-select";
import "./style.css";

export default function CompaniesSelect(props) {
  const [selectValue, setSelectValue] = useState(null)

  const changeSearch = (e) => {
    setSelectValue(e)
    // onInputChange(e.value);
  };

  const handleReset = () => {
    setSelectValue(null)
    // clearFilter()
  }

  const getOptionsForSearch = (companies) => {
    return companies.map((companie) => {
      return { value: companie.name, label: companie.name };
    });
  };

  return (
    <div className="tools-filter">
      <span> Выбрать компанию</span>

      <Select className="select-filter"
        options={getOptionsForSearch(props.companies)}
        onChange={changeSearch}
        value={selectValue}
      />

      <button className="clear-button" onClick={handleReset}>
        Отчистить
      </button>
    </div>
  );
}
