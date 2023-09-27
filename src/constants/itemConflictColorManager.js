const ITEM_MANAGER_CONFLICT_COLOR = {
  accepted: {
    backgroundColor: "#464040", // условно чёрный
    text: "Бронирование подтверждено.",
  },
  // rejected: {
  //   backgroundColor: "#f03333", // красный
  //   text: "Отклонённое бронирование.",
  // },
  pending: {
    backgroundColor: "#ff9900", // жёлтый
    text: "В ожидании подтверждения.",
  },
  changedShift: {
    backgroundColor: "gray", // серый
    text: "Изменённая Вами смена.",
  },
};

export default ITEM_MANAGER_CONFLICT_COLOR;
