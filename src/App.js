import Landing from "./pages/Landing";
import {Assistant} from "./pages/Assistant";

import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Translate } from "./pages/Translate";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
         
          <Route path="/Chat" element={<Assistant />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
