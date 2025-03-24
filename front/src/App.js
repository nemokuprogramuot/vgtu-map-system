import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import Main from "./Main";
import ErrorPage from "./ErrorPage";

function App() {
  return (
    <div >
      <Router>
       
        <Routes> 
          <Route path="/" element={<Main />} /> 
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        
      </Router>
    </div>
  );
}



export default App;