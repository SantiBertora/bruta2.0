import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu restauranteId={"bruta"}/>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
export default App;