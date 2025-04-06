import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";
import Main from "./Main";
import ErrorPage from "./ErrorPage";
import PageTemplate from "./PageTemplate";
import Navbar from "./Navbar";

function App() {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          {/* Dynamic route for pages */}
          <Route path="/:pageId" element={<PageTemplate />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </LoadScript>
  );
}

export default App;
