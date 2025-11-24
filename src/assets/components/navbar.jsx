import { useNavigate } from "react-router-dom";
import "../../styles/App.css";
function Navbar() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  const inicio = () => {
    navigate("/");
  };

  return (
    <nav className="navbar-container">
      {/* Enlaces a la izquierda */}
      <div className="navbar-left">
        <button className="nav-btn" onClick={inicio}>
          Inicio
        </button>
      </div>

      {/* Botón a la derecha */}
      <button className="nav-btn logout-btn" onClick={cerrarSesion}>
        Cerrar sesión
      </button>
    </nav>
  );
}

export default Navbar;
