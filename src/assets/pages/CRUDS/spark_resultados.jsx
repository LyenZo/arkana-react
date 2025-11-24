import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import "../../../styles/App.css";

export default function SparkResultados() {
  const [resultados, setResultados] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/SparkResultados")
      .then(async (res) => {
        if (!res.ok) throw new Error("Error al obtener resultados");
        const data = await res.json();
        setResultados(data.data[0]); // Tomamos el primer resultado
      })
      .catch((err) => {
        console.error("Error al cargar resultados:", err);
      });
  }, []);

  const parseFecha = (valor) => {
    if (!valor) return "";
    const fecha = new Date(valor.$date || valor);
    return isNaN(fecha) ? "" : fecha.toLocaleString();
  };

  if (!resultados) {
    return (
      <div className="crud-container" style={{ minHeight: "100vh" }}>
        <Navbar />
        <h2 className="crud-title" style={{ textAlign: "center", marginTop: "20px" }}>
          Resultados de Spark
        </h2>
        <p style={{ textAlign: "center", marginTop: "30px" }}>Cargando resultados...</p>
      </div>
    );
  }

  return (
    <div className="crud-container" style={{ minHeight: "100vh" }}>
      <Navbar />
      <h2 className="crud-title" style={{ textAlign: "center", marginTop: "20px" }}>
        Resultados de Spark
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "30px", alignItems: "center" }}>
        {/* Información general */}
        <div className="crud-card">
          <h3>Información General</h3>
          <p><strong>Fecha generado:</strong> {parseFecha(resultados.fecha_generado)}</p>
          <p><strong>Total registros:</strong> {resultados.total_registros}</p>
          <p><strong>Winrate global:</strong> {resultados.winrate_global.toFixed(2)}%</p>
        </div>

        {/* Promedios */}
        <div className="crud-card">
          <h3>Promedios</h3>
          <p><strong>Ganadas:</strong> {resultados.promedios.promedio_ganadas.toFixed(2)}</p>
          <p><strong>Perdidas:</strong> {resultados.promedios.promedio_perdidas.toFixed(2)}</p>
          <p><strong>Cartas:</strong> {resultados.promedios.promedio_cartas.toFixed(2)}</p>
          <p><strong>Ranking:</strong> {resultados.promedios.promedio_ranking.toFixed(2)}</p>
        </div>

        {/* Extremos */}
        <div className="crud-card">
          <h3>Extremos</h3>
          <p><strong>Máx Ganadas:</strong> {resultados.extremos.max_ganadas}</p>
          <p><strong>Mín Ganadas:</strong> {resultados.extremos.min_ganadas}</p>
          <p><strong>Ranking Máx:</strong> {resultados.extremos.ranking_max}</p>
          <p><strong>Ranking Mín:</strong> {resultados.extremos.ranking_min}</p>
        </div>

        {/* Top 5 Ranking */}
        <div className="crud-card">
          <h3>Top 5 Ranking</h3>
          <ul>
            {resultados.top5_ranking.map((u, index) => (
              <li key={index}>Usuario: {u.id_usuario} - Ranking: {u.ranking}</li>
            ))}
          </ul>
        </div>

        {/* Top 5 Winrate */}
        <div className="crud-card">
          <h3>Top 5 Winrate</h3>
          <ul>
            {resultados.top5_winrate.map((u, index) => (
              <li key={index}>Usuario: {u.id_usuario} - Winrate: {u.winrate.toFixed(2)}%</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
