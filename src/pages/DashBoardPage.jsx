import React from "react";
import { Routes, Route } from "react-router-dom";
import TimelinePage from "./TimelinePage";
import ProfitByTimeChart from "../components/DashbordComponents/ProfitByTimeChart";
import LesseeTableDashboard from "../components/DashbordComponents/LesseeTableDashboard";

function DashBoard() {
  return (
    <Routes>
      <Route path="/">
        <Route path="first" element={<ProfitByTimeChart />} />
        <Route path="2" element={<LesseeTableDashboard />} />
        <Route path="places" element={<TimelinePage />} />
        <Route path="contracts" element={<TimelinePage />} />
        <Route path="orders" element={<TimelinePage />} />
      </Route>
    </Routes>

  );
}

export default DashBoard;
