const ITEMS_PREORDER_COLOR = {
  empty: {
    backgroundColor: "#90ef90",
    backgroundImage: "none",
    border: "none",
    text: "Свободно.",
  },
  orderedButFreeInOtherEquipment: {
    backgroundColor: "#ffd884",
    backgroundImage: "none",
    border: "none",
    text: "Занято, но можно выбрать другое оборудование в эту смену.",
  },
  orderedInAllEquipment: {
    backgroundColor: "#ffa4a4",
    backgroundImage: "none",
    border: "none",
    text: "Занято на всех оборудованиях в эту смену.",
  },
  orderedInThisShiftAndNear: {
    backgroundColor: "#100e0e",
    backgroundImage: "none",
    border: "none",
    text: "Занято на всех оборудованиях на эту и соседние смены.",
  },
};

export default ITEMS_PREORDER_COLOR;
