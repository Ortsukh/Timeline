import React, { useEffect, useState } from "react";
import Select from "react-select";
import "../style.css";

export default function CompaniesSelect({
  selectedCompany,
  companies,
  setSelectedCompany,
  isClickedOnNew,
  isFromDashboard,
  isActiveCalendar,
}) {
  const [selectValue, setSelectValue] = useState(null);
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
  useEffect(() => {
    if (!selectedCompany) return;
    setSelectValue({
      value: selectedCompany.id,
      label: selectedCompany.name,
    });
  }, [selectedCompany]);

  const handleReset = () => {
    setSelectValue(null);
    setSelectedCompany(null);
  };

  return (
    <div className="tools-filter company-filter">
      <span> Выбрать арендатора</span>

      <Select
        isDisabled={!isActiveCalendar}
        className="select-filter"
        options={getOptionsForSearch(companies)}
        onChange={handleChange}
        value={selectValue}
        placeholder="Выбрать..."
      />
      {!selectedCompany && isClickedOnNew && (
        <div className="tooltip">Пожалуйста, выберите арендатора</div>
      )}
      {!isFromDashboard && (
      <button type="button" className="clear-button" onClick={handleReset}>
        Отчистить
      </button>
      ) }

    </div>
  );
}
