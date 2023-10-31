import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TimelinePage from "./pages/TimelinePage";
import ProfitByTimeChart from "./components/DashbordComponents/ProfitByTimeChart";
import RenterTableDashboard from "./components/DashbordComponents/RenterTableDashboard";
import UserBox from "./components/DashbordComponents/UserBox";
import ManagerDashboard from "./pages/ManagerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<TimelinePage />} />
        <Route path="1" element={<ProfitByTimeChart />} />
        <Route path="2" element={<RenterTableDashboard />} />
        <Route path="3" element={<UserBox />} />
        <Route path="4" element={<ManagerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
