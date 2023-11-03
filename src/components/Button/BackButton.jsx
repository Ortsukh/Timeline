import React from "react";
import buttonTitleConstants from "../../constants/buttonTitleConstants";

export default function BackButton({ classButton }) {
  const backToDashboard = () => {
    const { origin } = window.location;
    const { pathname } = window.location;
    window.location.replace(`${origin}${pathname}?page=main_dashboard`);
  };
  const className = `backButton back-dash-timeline${classButton || ""}`;
  return (
    <button type="button" className={className} onClick={backToDashboard}>
      {buttonTitleConstants.BACK}
    </button>
  );
}
