import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

function Home() {
  const navigate = useNavigate();
  const [usuariosActivos, setUsuariosActivos] = useState(0);
  const [cartasNFC, setCartasNFC] = useState(0);
  const [sparkMsg, setSparkMsg] = useState("");

  useEffect(() => {
    // Obtener usuarios activos
    fetch("http://localhost:5000/usuarios")
      .then(async (res) => {
        if (!res.ok) throw new Error("Error al obtener usuarios");
        const data = await res.json();
        const activos = data.filter((u) => u.estado_cuenta === "activo");
        setUsuariosActivos(activos.length);
      })
      .catch((err) => console.error("Error al cargar usuarios:", err));

    // Obtener cartas NFC
    fetch("http://localhost:5000/cartas_nfc")
      .then(async (res) => {
        if (!res.ok) throw new Error("Error al obtener cartas NFC");
        const data = await res.json();
        setCartasNFC(data.length);
      })
      .catch((err) => console.error("Error al cargar cartas NFC:", err));
  }, []);

  // Función para iniciar Spark
  const iniciarSpark = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/arrancarSpark", { method: "POST" });
      if (!res.ok) throw new Error("No se pudo iniciar Spark");
      setSparkMsg("Spark iniciado correctamente");
    } catch (err) {
      console.error(err);
      setSparkMsg("Error al iniciar Spark");
    }
  };

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
          <button type="button" className="btn-usuarios" onClick={() => navigate("/usuarios")}>
            Administrar usuarios
          </button>
          <button type="button" className="btn-cartas" onClick={() => navigate("/cartas")}>
            Administrar cartas
          </button>
          <button type="button" className="btn-cartas-nfc" onClick={() => navigate("/cartas_nfc")}>
            Administrar cartas físicas
          </button>
          <button type="button" className="btn-partidas" onClick={() => navigate("/partidas")}>
            Partidas en curso
          </button>
          <button type="button" className="btn-sanciones" onClick={() => navigate("/sanciones")}>
            Administrar sanciones
          </button>
          <button type="button" className="btn-graficas" onClick={() => navigate("/regresion_multiple")}>
            Regresión Multiple
          </button>
          <button type="button" className="btn-graficas" onClick={() => navigate("/regresion_lineal")}>
            Regresión lineal
          </button>
          <button type="button" className="btn-graficas" onClick={() => navigate("/spark_resultados")}>
            Resultados de Spark
          </button>
          <button type="button" className="btn-graficas" onClick={() => navigate("/ultimos_Resultados")}>
            Resultados más recientes
          </button>
        </div>
        {sparkMsg && <p style={{ marginTop: "10px", color: sparkMsg.includes("Error") ? "red" : "green" }}>{sparkMsg}</p>}
      </section>

      <section className="stats-section">
        <h3>Estadísticas</h3>
        <div className="stats-cards">
          <div className="stat-card">
            <h4>Usuarios activos</h4>
            <p>{usuariosActivos}</p>
          </div>
          <div className="stat-card">
            <h4>Cartas registradas</h4>
            <p>{cartasNFC}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
