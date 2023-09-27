import React from "react";
import Select from "react-select";
import "../style.css";

export default function CompaniesSelect({
  selectedCompany,
  companies,
  setSelectedCompany,
  isClickedOnNew,
}) {
  const handleChange = (e) => {
    setSelectedCompany({
      ...e,
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
    <div className="tools-filter company-filter">
      <span> Выбрать компанию</span>

      <Select
        className="select-filter"
        options={getOptionsForSearch(companies)}
        onChange={handleChange}
        value={selectedCompany}
      />
      {!selectedCompany && isClickedOnNew && (
        <div className="tooltip">Пожалуйста, выберите компанию</div>
      )}
      {/* <button type="button" className="clear-button" onClick={handleReset}> */}
      {/*  Отчистить */}
      {/* </button> */}
    </div>
  );
}
