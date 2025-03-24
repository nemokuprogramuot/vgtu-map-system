import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import Main from "./Main";

function App() {
  return (
    <div >
      <Router>
       
        <Routes> 
          <Route path="/" element={<Main />} /> 
          <Route path="*" element={<Main />} />
        </Routes>
        
      </Router>
    </div>
  );
}



export default App;