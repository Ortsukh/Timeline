import React, { useEffect, useState } from "react";

export default function UserAccountDashBoard({ id, userInfo, lesseeCompanies }) {
  const [contract, setContract] = useState({});
  useEffect(() => {
    // eslint-disable-next-line
    if(!lesseeCompanies) return
    const company = lesseeCompanies.find((item) => item.company.id.toString() === id);
    setContract(company);
  }, []);
  return (
    <div className="info-box bg-success">
      <div className="info-box-content">
        <span className="info-box-text">Счет</span>
        {/* eslint-disable-next-line no-nested-ternary */}
        <span className="info-box-number">{id ? contract ? contract.balance : " " : userInfo.balance}</span>
      </div>
    </div>
  );
}
