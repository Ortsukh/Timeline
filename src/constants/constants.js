const orderStatus = {
  accepted: {
    title: "accepted",
    color: "#4c7fe5", // синий
    translate: "Подтвержден",
  },
  rejected: {
    title: "rejected",
    color: "#f03333", // красный
    translate: "Отклонен",
  },
  pending: {
    title: "pending",
    color: "#ff9900", // жёлтый
    translate: "Ожидание",
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
