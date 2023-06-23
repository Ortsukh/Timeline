export default class JsonDataProvider {
  static tools = [
    {
      name: "Комбайн",
      assignedOrderId: ["order1", "order2"],
      category: "Комбайн",
    },
    {
      name: "Холодильник",
      assignedOrderId: [
        "order3",
        "order4",
        "order5",
        "order6",
        "order7",
        "order8",
      ],
      category: "Холодильник",
    },
    {
      name: "Холодильник1",
      assignedOrderId: ["order23", "order24", "order25"],
      category: "Холодильник",
    },
    {
      name: "Морозильник",
      assignedOrderId: ["order9", "order10", "order11"],
      category: "Морозильник",
    },
    {
      name: "Чайник",
      assignedOrderId: ["order12", "order13", "order14", "order15", "order16"],
      category: "Чайник",
    },
    {
      name: "Плита",
      assignedOrderId: ["order17", "order18", "order19", "order20"],
      category: "Плита",
    },
    {
      name: "Скалка",
      assignedOrderId: ["order21", "order22"],
      category: "Скалка",
    },
    {
      name: "Микроволновка",
      assignedOrderId: ["order23", "order24", "order25", "order26"],
      category: "Микроволновка",
    },
  ];

  static orders = [
    {
      companieId: 3, 
      id: "order1",
      from: 1580540400000,
      to: 1580547600000,
    },
    {
      companieId: 3, 
      id: "order2",
      from: 1580562000000,
      to: 1580569200000,
    },
    {
      companieId: 3, 
      id: "order3",
      from: 1580540400000,
      to: 1580547600000,
    },
    {
      companieId: 3, 
      id: "order4",
      from: 1580598000000,
      to: 1580605200000,
    },
    {
      companieId: 3, 
      id: "order5",
      from: 1580626800000,
      to: 1580634000000,
    },
    {
      companieId: 3, 
      id: "order6",
      from: 1580706000000,
      to: 1580713200000,
    },
    {
      companieId: 3, 
      id: "order7",
      from: 1580806800000,
      to: 1580814000000,
    },
    {
      companieId: 3, 
      id: "order8",
      from: 1580821200000,
      to: 1580828400000,
    },
    {
      companieId: 3, 
      id: "order9",
      from: 1580562000000,
      to: 1580569200000,
    },
    {
      companieId: 3, 
      id: "order10",
      from: 1580641200000,
      to: 1580648400000,
    },
    {
      companieId: 3, 
      id: "order11",
      from: 1580742000000,
      to: 1580749200000,
    },
    {
      companieId: 3, 
      id: "order12",
      from: 1580526000000,
      to: 1580533200000,
    },
    {
      companieId: 3, 
      id: "order13",
      from: 1580576400000,
      to: 1580583600000,
    },
    {
      companieId: 3, 
      id: "order14",
      from: 1580619600000,
      to: 1580626800000,
    },
    {
      companieId: 3, 
      id: "order15",
      from: 1580720400000,
      to: 1580727600000,
    },
    {
      companieId: 3, 
      id: "order16",
      from: 1580734800000,
      to: 1580742000000,
    },
    {
      companieId: 3, 
      id: "order17",
      from: 1580554800000,
      to: 1580562000000,
    },
    {
      companieId: 3, 
      id: "order18",
      from: 1580655600000,
      to: 1580662800000,
    },
    {
      companieId: 3, 
      id: "order19",
      from: 1580684400000,
      to: 1580691600000,
    },
    {
      companieId: 3, 
      id: "order20",
      from: 1580749200000,
      to: 1580756400000,
    },
    {
      companieId: 3, 
      id: "order21",
      from: 1580533200000,
      to: 1580540400000,
    },
    {
      companieId: 3, 
      id: "order22",
      from: 1580648400000,
      to: 1580655600000,
    },
    {
      companieId: 3, 
      id: "order23",
      from: 1580749200000,
      to: 1580756400000,
    },
    {
      companieId: 3, 
      id: "order24",
      from: 1580533200000,
      to: 1580540400000,
    },
    {
      companieId: 3, 
      id: "order25",
      from: 1580648400000,
      to: 1580655600000,
    },
  ];

  static companies = [
    {
      id: 1,
      name: "title",
    },
    {
      id: 2,
      name: "title1",
    },
    {
      id: 3,
      name: "title2",
    },
    {
      id: 4,
      name: "title3",
    },
  ];

  static add = (order, toolId) => {
    this.orders.push(order);
    this.tools[0].assignedOrderId.push(order.id);
  };

  static callMockApiCall = () => {
    return {
      tools: this.tools,
      orders: this.orders,
      companies: this.companies,
    };
  };
}
