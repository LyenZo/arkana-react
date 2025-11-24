import { Routes, Route } from "react-router-dom";
import Home from "./assets/pages/home";
import Login from "./assets/pages/login";
import ProtectedRoute from "./assets/components/ProtectedRoute";
import Usuarios from "./assets/pages/CRUDS/usuarios";
import Cartas from "./assets/pages/CRUDS/cartas";
import CartasNFC from "./assets/pages/CRUDS/cartas_nfc";
import Partidas from "./assets/pages/CRUDS/partidas";
import Sanciones from "./assets/pages/CRUDS/sanciones";
import RegresionLineal from "./assets/pages/CRUDS/regresion_lineal";
import RegresionMultiple from "./assets/pages/CRUDS/regresion_multiple";
import SparkResultados from "./assets/pages/CRUDS/spark_resultados";
import UltimosResultados from "./assets/pages/CRUDS/ultimos_resultados";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={ <ProtectedRoute> <Home /> </ProtectedRoute>}/>
        <Route path="/usuarios" element={ <ProtectedRoute> <Usuarios /> </ProtectedRoute>}/>
        <Route path="/cartas" element={ <ProtectedRoute> <Cartas /> </ProtectedRoute>}/>
        <Route path="/cartas_nfc" element={ <ProtectedRoute> <CartasNFC /> </ProtectedRoute>}/>
        <Route path="/partidas" element={ <ProtectedRoute> <Partidas /> </ProtectedRoute>}/>
        <Route path="/sanciones" element={ <ProtectedRoute> <Sanciones /> </ProtectedRoute>}/>
        <Route path="/regresion_lineal" element={ <ProtectedRoute> <RegresionLineal /> </ProtectedRoute>}/>
        <Route path="/regresion_multiple" element={ <ProtectedRoute> <RegresionMultiple/> </ProtectedRoute>}/>
        <Route path="/spark_resultados" element={ <ProtectedRoute> <SparkResultados/> </ProtectedRoute>}/>
        <Route path="/ultimos_resultados" element={ <ProtectedRoute> <UltimosResultados/> </ProtectedRoute>}/>

      </Routes>
    </div>
  );
}

export default App;
