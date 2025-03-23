import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TestApi from "./TestApi";


function App() {
  return (
    <div className="App">
       <Router>
       <Routes>  
       <Route path="/testapi" element={<TestApi />} /> 
        </Routes> 
       </Router>
    </div>
  );
}

export default App;
