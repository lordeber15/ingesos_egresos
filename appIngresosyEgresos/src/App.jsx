// import style from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./views/langind/landing";
import Navbar from "./components/navbar/navbar";
import About from "./views/about/about";
import Egresos from "./views/egresos/egresos";
import Consultas from "./views/consultas/consultas";
import Report from "./views/Report/report";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/ingresos" element={<Landing />} />
        <Route path="/egresos" element={<Egresos />} />
        <Route path="/consultas" element={<Consultas />} />
        <Route path="/about" element={<About />} />
        <Route path="/reportes" element={<Report />} />
      </Routes>
    </div>
  );
}

export default App;
