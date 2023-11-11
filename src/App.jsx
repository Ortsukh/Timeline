import "./App.css";
import React, { useEffect, useState } from "react";
import TimelinePage from "./pages/TimelinePage";
import ManagerDashboard from "./pages/ManagerDashboard";
import LesseeDashboard from "./pages/LesseeDashboard";
import BookingPage from "./pages/BookingPage";

function App() {
  // console.log(12312);
  // console.log("window.location.search", window.location.search);
  const [route, setRoute] = useState("");
  const [lesseeId, setLesseeId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [dashboardPage, setDashboardPage] = useState(null);
  useEffect(() => {
    const rout = window.location.search.substring(1).split("&").find((query) => query.startsWith("page"))?.split("=")[1];
    const lessee = window.location.search.substring(1).split("&").find((query) => query.startsWith("id"))?.split("=")[1];
    const order = window.location.search.substring(1).split("&").find((query) => query.startsWith("order_id"))?.split("=")[1];
    const userType = window.FR?.currentCompanyType;
    const userID = window.FR?.currentCompanyId;
    const arrName = window.FR?.currentRouteName.split("_");
    console.log(window.FR);
    setCompanyType(userType);
    setCompanyId(userID);
    setDashboardPage(arrName.includes("dashboard"));
    // console.log("rout", rout);
    // console.log("lessee", lessee);
    setOrderId(order);
    setLesseeId(lessee);
    setRoute(rout);
  }, [window.location.search, window.FR]);
  // console.log("companyType:", companyType);
  // console.log("companyId:", companyId);
  // console.log("window.FR:", window.FR);
  const getPage = () => {
    // let result = "";
    console.log("companyType", companyType);
    console.log("route", route);
    console.log("dashboardPage", dashboardPage);
    console.log("lesseeId", lesseeId);
    if (route === "timeline") return <TimelinePage />;
    if (route === "booking_menu") return <BookingPage orderId={orderId} />;
    if (companyType === "manager" && route !== "lessee_dashboard" && dashboardPage) return <ManagerDashboard user="manager" />;
    if (route === "lessee_dashboard" || companyType === "lessee") {
      return (
        <LesseeDashboard
          lesseeId={lesseeId || companyId}
          isMainLessee={companyType === "lessee"}
          user="lessee"
        />
      );
    }
    return (
      <>
      </>
    );
  };

  return (
    <>
      {getPage()}
    </>
  );
}

export default App;
