import AaveEth from "./pages/aave-eth/AaveEth.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style/global.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<AaveEth />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
