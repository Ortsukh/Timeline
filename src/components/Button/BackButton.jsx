import React from "react";
import buttonTitleConstants from "../../constants/buttonTitleConstants";

export default function BackButton() {
  const backToDashboard = () => {
    const { origin } = window.location;
    window.location.replace(`${origin}?page=main_dashboard`);
  };
  return (
    <button type="button" className="backButton back-dash-timeline" onClick={backToDashboard}>
      {buttonTitleConstants.BACK}
    </button>
  );
}
