import { useNavigate } from "react-router-dom";
import Navbar from "../../assets/components/navbar";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Navbar />

      <h1 className="home-title">Panel de Administración</h1>
      <p className="home-subtitle">
        Bienvenido al sistema administrador del juego de cartas NFC.
      </p>

      <section className="quick-access">
  <h3>Accesos rápidos</h3>
  <div className="btn-group">
    <button className="btn-usuarios" onClick={() => navigate("/usuarios")}>Administrar usuarios</button>
    <button className="btn-cartas" onClick={() => navigate("/cartas")}>Administrar cartas</button>
    <button className="btn-cartas-nfc" onClick={() => navigate("/cartasNFC")}>Administrar cartas físicas</button>
    <button className="btn-partidas" onClick={() => navigate("/partidas")}>Partidas en curso</button>
    <button className="btn-sanciones" onClick={() => navigate("/sanciones")}>Administrar sanciones</button>
    <button className="btn-graficas" onClick={() => navigate("/graficas_spark")}>Gráficas de Apache Spark</button>
  </div>
</section>


      <section className="stats-section">
        <h3>Estadísticas</h3>
        <div className="stats-cards">
          <div className="stat-card">
            <h4>Usuarios activos</h4>
            <p>124</p>
          </div>
          <div className="stat-card">
            <h4>Cartas registradas</h4>
            <p>320</p>
          </div>
          <div className="stat-card">
            <h4>Lecturas NFC hoy</h4>
            <p>48</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
