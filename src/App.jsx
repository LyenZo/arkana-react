import { Routes, Route } from "react-router-dom";
import Home from "./assets/pages/home";
import Login from "./assets/pages/login";
import ProtectedRoute from "./assets/components/ProtectedRoute";
import Usuarios from "./assets/pages/usuarios";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={ <ProtectedRoute> <Home /> </ProtectedRoute>}/>
        <Route path="/usuarios" element={ <ProtectedRoute> <Usuarios /> </ProtectedRoute>}/>
      </Routes>
    </div>
  );
}

export default App;
