import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import Main from "./Main";
import ErrorPage from "./ErrorPage";
import S1 from './S1';
import S2 from './S2';
import S3 from './S3';
import S4 from './S4';
import S5 from './S5';
import S6 from './S6';


function App() {
  return (
    <div >
      <Router>
       
        <Routes> 
          <Route path="/" element={<Main />} /> 
          <Route path="/S1" element={<S1 />} />
          <Route path="/S2" element={<S2 />} />
          <Route path="/S3" element={<S3 />} />
          <Route path="/S4" element={<S4 />} />
          <Route path="/S5" element={<S5 />} />
          <Route path="/S6" element={<S6 />} />
          <Route path="/S7" element={<S6 />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
        
      </Router>
    </div>
  );
}



export default App;