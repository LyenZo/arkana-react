import { Routes, Route } from "react-router-dom";
import Home from "./assets/pages/home";
import Login from "./assets/pages/login";
import ProtectedRoute from "./assets/components/ProtectedRoute";
import Usuarios from "./assets/pages/CRUDS/usuarios";
import Cartas from "./assets/pages/CRUDS/cartas";
import CartasNFC from "./assets/pages/CRUDS/cartas_nfc";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={ <ProtectedRoute> <Home /> </ProtectedRoute>}/>
        <Route path="/usuarios" element={ <ProtectedRoute> <Usuarios /> </ProtectedRoute>}/>
        <Route path="/cartas" element={ <ProtectedRoute> <Cartas /> </ProtectedRoute>}/>
        <Route path="/cartasNFC" element={ <ProtectedRoute> <CartasNFC /> </ProtectedRoute>}/>
      </Routes>
    </div>
  );
}

export default App;
