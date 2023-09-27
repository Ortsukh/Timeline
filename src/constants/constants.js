const orderStatus = {
  accepted: {
    title: "accepted",
    color: "#90ef90", //!
    translate: "Подтвержден",
  },
  rejected: {
    title: "rejected",
    color: "#f03333", //!
    translate: "Отклонен",
  },
  pending: {
    title: "pending",
    color: "#ffd884", // жёлтый
    translate: "Ожидание",
  },
  other: {
    color: "#ffa4a4", //!
  },
  booked: {
    color: "#464040", // условно чёрный
  },
  otherPending: {
    color: "#c54343", // тёмно-красный
  },
  franchise: {
    accepted: {
      color: "#464040", // условно чёрный
    },
    rejected: {
      color: "#f03333", // красный
    },
    pending: {
      color: "#ff9900", // жёлтый
    },
    default: {
      color: "#2780FC", // синий?
    },
  },
  // waitingRole: {
  //   color: "white",
  // },
};

export default orderStatus;
