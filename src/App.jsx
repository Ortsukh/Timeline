import "./App.css";
import React, { useEffect, useState } from "react";
import TimelinePage from "./pages/TimelinePage";
import ManagerDashboard from "./pages/ManagerDashboard";
import LesseeDashboard from "./pages/LesseeDashboard";

function App() {
  console.log(12312);
  console.log(window.location.search);
  const [route, setRoute] = useState("");
  let lesseeId = null;
  useEffect(() => {
    const rout = window.location.search.substring(1).split("&").find((query) => query.startsWith("page"))?.split("=")[1];
    lesseeId = window.location.search.substring(1).split("&").find((query) => query.startsWith("id"))?.split("=")[1];
    console.log(rout);
    setRoute(rout);
  }, [window.location.search]);

  const getPage = () => {
    let result = "";
    switch (route) {
      case "main_dashboard": result = <ManagerDashboard />;
        break;
      case "timeline": result = <TimelinePage />;
        break;
      case "lessee_dashboard": result = <LesseeDashboard lesseeId={lesseeId} />;
        break;
      default:
        result = <ManagerDashboard />;
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
