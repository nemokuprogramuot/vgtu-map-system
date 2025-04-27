import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";
import Main from "./Main";
import ErrorPage from "./ErrorPage";
import PageTemplate from "./PageTemplate";
import Navbar from "./Navbar";
import Comment from "./Comment";
import Login from "./Login";
import Register from "./Register";
import CommentsPage from "./CommentsPage";
import { translations } from "./translations";

function App() {
  const [language, setLanguage] = useState('lt'); 

  const t = (key) => {
    const keys = key.split('.');
    let result = translations[language];
    keys.forEach(k => {
      result = result ? result[k] : null;
    });
    return result || key;
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <Router>
        <Navbar language={language} setLanguage={setLanguage} t={t} />
        <Routes>
          <Route path="/" element={<Main t={t} />} /> {/* Pass t */}
          <Route path="/:pageId" element={<PageTemplate t={t} />} /> {/* Pass t */}
          <Route path="/comment" element={<Comment t={t} />} /> {/* Pass t */}
          <Route path="/login" element={<Login t={t} />} /> {/* Pass t */}
          <Route path="/register" element={<Register t={t} />} /> {/* Pass t */}
          <Route path="/comments" element={<CommentsPage t={t} />} /> {/* Pass t */}
          <Route path="*" element={<ErrorPage t={t} />} /> {/* Pass t */}
        </Routes>
      </Router>
    </LoadScript>
  );
}

export default App;