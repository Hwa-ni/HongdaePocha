import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ButteredHome from "./screens/HongdaePocha/HongdaePochaHome";
import ButteredFoodItems from "./screens/HongdaePocha/Menu/Hongdae_Pocha_Food_Items";
import ButteredAbout from "./screens/HongdaePocha/Menu/Hongdae_Pocha_About";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Router>
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<ButteredHome />} />
            <Route path="/MainMenu" element={<ButteredFoodItems />} />
            <Route path="/About" element={<ButteredAbout />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
