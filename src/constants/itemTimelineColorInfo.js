const ITEM_COLOR_INFO = {
  role_manager: {
    main: {
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
    },
    conflict: {
      accepted: {
        backgroundColor: "#ffa4a4", // светло-красный
        text: "Смена забронирована.",
      },
      addShift: {
        backgroundColor: "#90ef90", // светло-зелёный
        text: "Выбранная Вами смена.",
      },
      changedShift: {
        backgroundColor: "lightgray", // серый
        text: "Изменённая Вами смена.",
      },
    },
  },
  role_company: {
    main: {
      accepted: {
        backgroundColor: "#90ef90", // светло-зелёный
        text: "Забронирована Вами.",
      },
      pending: {
        backgroundColor: "#ffd884", // светло-жёлтый
        text: "Ваше бронирование в ожидании подтверждения.",
      },
      other: {
        backgroundColor: "#ffa4a4", // светло-красный
        text: "Забронирована другим клиентом.",
      },
    },
    conflict: {
      accepted: {
        backgroundColor: "#ffa4a4", // светло-красный
        text: "Смена забронирована.",
      },
      addShift: {
        backgroundColor: "#90ef90", // светло-зелёный
        text: "Выбранная Вами смена.",
      },
      changedShift: {
        backgroundColor: "lightgray", // серый
        text: "Изменённая Вами смена.",
      },
    },
  },
};

export default ITEM_COLOR_INFO;
