import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ButteredHome from "./screens/HongdaePocha/HongdaePochaHome";
import ButteredFoodItems from "./screens/HongdaePocha/Menu/Buttered_Food_Items";
import ButteredReservation from "./screens/HongdaePocha/Menu/Buttered_Reservation";
import ButteredAbout from "./screens/HongdaePocha/Menu/Buttered_About";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Router>
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<ButteredHome />} />
            <Route path="/MainMenu" element={<ButteredFoodItems />} />
            <Route path="/About" element={<ButteredAbout />} />
            <Route path="/Reservation" element={<ButteredReservation />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
