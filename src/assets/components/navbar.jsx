import { Link, useNavigate } from "react-router-dom";

function Navbar() {
const navigate = useNavigate();
const cerrarSesion = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("usuario");
    navigate("/login");
};

return (
    <nav
    style={{
        padding: "10px",
        background: "#eee",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }}
    >
      {/* Enlaces a la izquierda */}
    <div style={{ display: "flex", gap: "10px" }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
    </div>

      {/* Botón a la derecha */}
    <button onClick={cerrarSesion}>Cerrar sesión</button>
    </nav>
);
}

export default Navbar;
