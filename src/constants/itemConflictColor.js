const ITEM_CONFLICT_COLOR = {
  accepted: {
    backgroundColor: "#90ef90", // blue
    text: "Забронирована Вами.",
  },
  pending: {
    backgroundColor: "#ffd884", // yellow
    text: "Ваше бронирование в ожидании подтверждения.",
  },
  other: {
    backgroundColor: "#ffa4a4", // yellow
    text: "Забронированна другим клиентом.",
  },

  // accepted: {
  //   backgroundColor: "#4c7fe5", // blue
  //   text: "Забронирована Вами.",
  // },
  // rejected: {
  //   backgroundColor: "#f03333",
  //   text: "2 Отклонен",
  // },
  // pending: {
  //   backgroundColor: "#ff9900", // yellow
  //   text: "Ваше бронирование в ожидании подтверждения.",
  // },
  // booked: {
  //   backgroundColor: "#464040", // black
  //   text: "Забронированна другим клиентом.",
  // },
  // otherPending: {
  //   backgroundColor: "#c54343", // red
  //   text: "Чужое бронирование в ожидании подтверждения.",
  // },
  // changedShift: {
  //   backgroundColor: "gray", // gray
  //   text: "Изменённая Вами смена.",
  // },
};

export default ITEM_CONFLICT_COLOR;
