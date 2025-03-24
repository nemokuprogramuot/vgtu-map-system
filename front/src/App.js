import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import Main from "./Main";
import ErrorPage from "./ErrorPage";
import S1 from './S1';


function App() {
  return (
    <div >
      <Router>
       
        <Routes> 
          <Route path="/" element={<Main />} /> 
          <Route path="/S1" element={<S1 />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        
      </Router>
    </div>
  );
}



export default App;