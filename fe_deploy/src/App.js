import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as Routers from "./utils/Routes";
import Utils from "@utils/Utils";

import LoginPage from "./pages/customer/login_register/LoginPage";
import Home from "./pages/customer/home/HomePage.jsx";


import { useEffect } from "react";
import { useAppSelector } from "@redux/store";

function App() {
  useEffect(() => {
    document.title = "My Uroom";
  }, []);

  
  return (
    <Router>
      <Routes>
        <Route path={Routers.LoginPage} element={<LoginPage />} />
        <Route path={Routers.Home} element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
