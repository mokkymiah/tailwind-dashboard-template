import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import Landlords from "./pages/Landlords";
import Rooms from "./pages/Rooms";
import Residents from "./pages/Residents";
import SupportSessions from "./pages/SupportSessions";
import Safeguarding from "./pages/Safeguarding";
import Compliance from "./pages/Compliance";
import Inspections from "./pages/Inspections";
import Maintenance from "./pages/Maintenance";
import Staff from "./pages/Staff";
import Chat from "./pages/Chat";
import Alerts from "./pages/Alerts";
import AiAssistant from "./pages/AiAssistant";
import HbClaims from "./pages/HbClaims";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/properties" element={<Properties />} />
        <Route exact path="/landlords" element={<Landlords />} />
        <Route exact path="/rooms" element={<Rooms />} />
        <Route exact path="/residents" element={<Residents />} />
        <Route exact path="/support-sessions" element={<SupportSessions />} />
        <Route exact path="/safeguarding" element={<Safeguarding />} />
        <Route exact path="/compliance" element={<Compliance />} />
        <Route exact path="/inspections" element={<Inspections />} />
        <Route exact path="/maintenance" element={<Maintenance />} />
        <Route exact path="/staff" element={<Staff />} />
        <Route exact path="/chat" element={<Chat />} />
        <Route exact path="/alerts" element={<Alerts />} />
        <Route exact path="/ai" element={<AiAssistant />} />
        <Route exact path="/hb-claims" element={<HbClaims />} />
      </Routes>
    </>
  );
}

export default App;
