import React, { useEffect, useState } from "react";
import { getRentCompanies } from "../../Api/DashboardApi";

export default function UserAccountDashBoard({ id }) {
  const [contract, setContract] = useState({});

  useEffect(() => {
    getRentCompanies(id).then((response) => {
      console.log(response);
      console.log(id);

      const company = response.data.find((item) => item.company.id == id);
      setContract(company);
    });
  }, []);
  console.log(contract);
  return (
    <div className="info-box bg-success">
      <div className="info-box-content">
        <span className="info-box-text">Счет</span>
        <span className="info-box-number">{contract ? contract.balance : 222}</span>
      </div>
    </div>
  );
}
