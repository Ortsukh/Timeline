const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;
app.use(cors());
const backendUrl = "/admin/manager/";

app.get(`${backendUrl}get_orders*`, (req, res, next) => {
  const options = {
    root: path.join(__dirname, "db"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };

  res.sendFile("order.json", options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Sent: export_sales.json");
    }
  });
});

app.get(`${backendUrl}get_lessee_info*`, (req, res, next) => {
  const options = {
    root: path.join(__dirname, "db"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };

  res.sendFile("lesseeInfo.json", options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Sent: export_sales.json");
    }
  });
});

app.get(`${backendUrl}get_finance_report*`, (req, res, next) => {
  const options = {
    root: path.join(__dirname, "db"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };

  res.sendFile("profit.json", options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Sent: export_sales.json");
    }
  });
});

app.get(`${backendUrl}get_category_info*`, (req, res, next) => {
  const options = {
    root: path.join(__dirname, "db"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };

  res.sendFile("categoryInfo.json", options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Sent: export_sales.json");
    }
  });
});

app.get(`${backendUrl}get_manager_info*`, (req, res, next) => {
  const options = {
    root: path.join(__dirname, "db"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };

  res.sendFile("managerInfo.json", options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Sent: export_sales.json");
    }
  });
});

app.get(`${backendUrl}get_current_user`, (req, res, next) => {
  const options = {
    root: path.join(__dirname, "db"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };

  res.sendFile("userManagerInfo.json", options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Sent: export_sales.json");
    }
  });
});

app.get(`${backendUrl}get_current_user/:id`, (req, res, next) => {
  const options = {
    root: path.join(__dirname, "db"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };

  res.sendFile("userLesseeInfo.json", options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Sent: export_sales.json");
    }
  });
});

app.get(`${backendUrl}get_lessee_companies*`, (req, res, next) => {
  const options = {
    root: path.join(__dirname, "db"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };

  res.sendFile("companies.json", options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Sent: export_sales.json");
    }
  });
});
app.get(`${backendUrl}get_local_orders`, (req, res, next) => {
  console.log(req.query);
  const options = {
    root: path.join(__dirname, "db"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };

  res.sendFile("equipmentItems.json", options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Sent: export_sales.json");
    }
  });
});
app.get(`${backendUrl}get_local_equipment`, (req, res, next) => {
  const options = {
    root: path.join(__dirname, "db"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };

  res.sendFile("equipment.json", options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Sent: export_sales.json");
    }
  });
});

app.get(`${backendUrl}get_local_orders*`, (req, res, next) => {
  const options = {
    root: path.join(__dirname, "db"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };

  res.sendFile("order.json", options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Sent: export_sales.json");
    }
  });
});

app.get(`${backendUrl}get_equipment_items*`, (req, res, next) => {
  let queryStr = "?";
  Object.keys(req.query).forEach((query) => {
    queryStr += `${query}=${req.query[query]}&`;
  });
  console.log(queryStr);
  fetch(`http://freekitchen.loc/test/get_equipment_items${queryStr}`).then((res1) => res1.json().then((data) => {
    res.json(data);
  }));
});

app.get(`${backendUrl}get_equipment*`, (req, res, next) => {
  const query = req.query.categoryId ? `?categoryId=${req.query.categoryId}` : "";
  fetch(`http://freekitchen.loc/test/get_equipment${query}`).then((res1) => res1.json().then((data) => {
    console.log(req.query);
    res.json(data);
  }));
});

app.get(`${backendUrl}get_contracts*`, (req, res, next) => {
  const options = {
    root: path.join(__dirname, "db"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };

  res.sendFile("contracts.json", options, (err) => {
    if (err) {
      next(err);
    } else {
      // console.log('Sent: export_sales.json');
    }
  });
});

app.get(`${backendUrl}get_transactions*`, (req, res, next) => {
  const options = {
    root: path.join(__dirname, "db"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };

  res.sendFile("transactions.json", options, (err) => {
    if (err) {
      next(err);
    } else {
      // console.log('Sent: export_sales.json');
    }
  });
});

app.get(`${backendUrl}get_kitchen_equipment*`, (req, res, next) => {
  const options = {
    root: path.join(__dirname, "db"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };
  res.sendFile("kitchenEquipment.json", options, (err) => {
    if (err) {
      next(err);
    } else {
      // console.log('Sent: export_sales.json');
    }
  });
});

app.get(`${backendUrl}get_current_kitchens*`, (req, res, next) => {
  const options = {
    root: path.join(__dirname, "db"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };

  res.sendFile("currentKitchens.json", options, (err) => {
    if (err) {
      next(err);
    } else {
      // console.log('Sent: export_sales.json');
    }
  });
});

app.use("/", express.static(path.join(__dirname, "public")));

//

app.listen(port, () => console.log(`Inventory app listening on port ${port}!`));
