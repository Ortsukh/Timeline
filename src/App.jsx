import "./App.css";
import React, { useEffect, useState } from "react";
import TimelinePage from "./pages/TimelinePage";
import ManagerDashboard from "./pages/ManagerDashboard";
import LesseeDashboard from "./pages/LesseeDashboard";

function App() {
  // console.log(12312);
  // console.log("window.location.search", window.location.search);
  const [route, setRoute] = useState("");
  const [lesseeId, setLesseeId] = useState("");
  const [companyType, setCompanyType] = useState("");
  // eslint-disable-next-line
  const [companyId, setCompanyId] = useState("");
  const [dashboardPage, setDashboardPage] = useState(null);
  useEffect(() => {
    const rout = window.location.search.substring(1).split("&").find((query) => query.startsWith("page"))?.split("=")[1];
    const lessee = window.location.search.substring(1).split("&").find((query) => query.startsWith("id"))?.split("=")[1];
    const userType = window.FR?.currentCompanyType;
    const userID = window.FR?.currentCompanyId;
    const arrName = window.FR?.currentRouteName.split("_");
    setCompanyType(userType);
    setCompanyId(userID);
    setDashboardPage(arrName.includes("dashboard"));
    // console.log("rout", rout);
    // console.log("lessee", lessee);
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
    if (companyType === "manager" && route !== "lessee_dashboard" && dashboardPage) return <ManagerDashboard />;
    if (route === "lessee_dashboard" || companyType === "lessee") return <LesseeDashboard lesseeId={lesseeId || companyId} />;
    return <ManagerDashboard />;
    // switch (route) {
    //   case "main_dashboard": result = <ManagerDashboard />;
    //     break;
    //   case "timeline": result = <TimelinePage />;
    //     break;
    //   case "lessee_dashboard": result = <LesseeDashboard lesseeId={lesseeId} />;
    //     break;
    //   default:
    //     result = <ManagerDashboard />;
    // }
    // return result;
  };

  return (
    <>
      {getPage()}
    </>

  // <BrowserRouter>
  //   <Routes>
  //     <Route exect path="/" element={<TimelinePage />} />
  //     <Route path="1" element={<ProfitByTimeChart />} />
  //     <Route path="2" element={<RenterTableDashboard />} />
  //     <Route path="3" element={<UserBox />} />
  //     <Route path="/4" element={<ManagerDashboard />} />
  //   </Routes>
  // </BrowserRouter>
  );
}

export default App;
