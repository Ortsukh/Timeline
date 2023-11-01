import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TimelinePage from "./pages/TimelinePage";
import ProfitByTimeChart from "./components/DashbordComponents/ProfitByTimeChart";
import RenterTableDashboard from "./components/DashbordComponents/RenterTableDashboard";
import UserBox from "./components/DashbordComponents/UserBox";
import ManagerDashboard from "./pages/ManagerDashboard";

function App() {
  console.log(12312);
  console.log(window.location.search);
  const [route, setRoute] = useState("");
  useEffect(() => {
    const rout = window.location.search.substring(1).split("&").find((query) => query.startsWith("page"))?.split("=")[1];
    console.log(rout);
    setRoute(rout);
  }, [window.location.search]);

  const getPage = () => {
    let result = "";
    switch (route) {
      case "main_dashboard": result = <ManagerDashboard />;
        break;
      case "": result = <TimelinePage />;
        break;
      case "2": result = <TimelinePage />;
        break;
      default:
        result = <TimelinePage />;
    }
    return result;
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
