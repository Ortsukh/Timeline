import React from "react";
import buttonTitleConstants from "../../../../../constants/buttonTitleConstants";

export default function MainConfInfo() {
  return (
    <div style={{
      width: "auto", margin: "0 auto", padding: "0 20px", fontSize: "20px", backgroundColor: "white", border: "1px solid #c1c1c1", borderRadius: "30px",
    }}
    >
      <h3 style={{ fontSize: "18px" }}>Для начала бронирования выполните следующие шаги:</h3>
      <p style={{ marginLeft: "20px", fontSize: "14px" }}>1. Выберите подходящее Вам оборудование;</p>
      <p style={{ marginLeft: "20px", fontSize: "14px" }}>2. Укажите подходящее Вам время и количество смен;</p>
      <p style={{ marginLeft: "20px", fontSize: "14px" }}>3. Выделите нужные даты;</p>
      <p style={{ marginLeft: "20px", fontSize: "14px" }}>
        {"4. Нажмите кнопку "}
        <span style={{ fontStyle: "italic" }}>
          `
          {buttonTitleConstants.CALCULATE}
          `;
        </span>
      </p>
      <p style={{ marginLeft: "20px", fontSize: "14px" }}>
        {"5. Если вы ошибочно выбрали даты, нажмите кнопку "}
        <span style={{ fontStyle: "italic" }}>
          `
          {buttonTitleConstants.CLEAN}
          `.
        </span>
      </p>
      <h4 style={{ fontWeight: "400", marginBottom: "0", fontSize: "16px" }}>
        {"После этого, если "}
        <span style={{ fontWeight: "700" }}>выбранные Вами смены были заняты</span>
        {", вы можете "}
        <span style={{ fontWeight: "700" }}>разрешить эти конфликты</span>
        {" путем выбора других смен."}
      </h4>
      <h4 style={{ marginTop: "10px", fontSize: "14px" }}>При успешном бронировании вы можете подтвердить его.</h4>
    </div>
  );
}
