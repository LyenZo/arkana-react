import { useNavigate } from "react-router-dom";
import Navbar from "../../assets/components/navbar";
function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar/>
      <h1>Panel de Administración</h1>
      <p>Bienvenido al sistema administrador del juego de cartas NFC.</p>

      <h3>Accesos rápidos</h3>

      <div>
        <button onClick={() => navigate("/usuarios")}>
          Administrar usuarios
        </button>

        <button onClick={() => navigate("/cartas")}>
          Administrar cartas
        </button>

        <button onClick={() => navigate("/cartasNFC")}>
          Administrar cartas físicas
        </button>

        <button onClick={() => navigate("/partidas")}>
          Partidas en curso
        </button>

        <button onClick={() => navigate("/sanciones")}>
          Administrar sanciones
        </button>

        <button onClick={() => navigate("/graficas_spark")}>
          Graficas de Apache Spark
        </button>
      </div>

      <div>
        <h3>Estadísticas</h3>

        <div>
          <h4>Usuarios activos</h4>
          <p>124</p>
        </div>

        <div>
          <h4>Cartas registradas</h4>
          <p>320</p>
        </div>

        <div>
          <h4>Lecturas NFC hoy</h4>
          <p>48</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
