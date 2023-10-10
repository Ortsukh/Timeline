const orderStatus = {
  accepted: {
    title: "accepted",
    translatRU: "Принят",
    color: "#90ef90", //!
    translate: "Подтвержден",
  },
  rejected: {
    title: "rejected",
    translatRU: "Отклонён",
    color: "#f03333", //!
    translate: "Отклонен",
  },
  pending: {
    title: "pending",
    translatRU: "В ожидании",
    color: "#ffd884", // жёлтый
    translate: "Ожидание",
  },
  other: {
    translatRU: "Другое",
    color: "#ffa4a4", //!
  },
  booked: {
    translatRU: "Забронирован",
    color: "#464040", // условно чёрный
  },
  otherPending: {
    translatRU: "Забронирован другим",
    color: "#c54343", // тёмно-красный
  },
  franchise: {
    accepted: {
      translatRU: "Принят",
      color: "#464040", // условно чёрный
    },
    rejected: {
      translatRU: "Отклонён",
      color: "#f03333", // красный
    },
    pending: {
      translatRU: "В ожидании",
      color: "#ff9900", // жёлтый
    },
    default: {
      translatRU: "Другое",
      color: "#2780FC", // синий? дэфолтный
    },
  },
  // waitingRole: {
  //   translatRU: "В ожидании",
  //   color: "white",
  // },
};

export default orderStatus;
