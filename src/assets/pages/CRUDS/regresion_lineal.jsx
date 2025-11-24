import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import "../../../styles/App.css";

export default function RegresionLineal() {
  const [imagen, setImagen] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/regresion") // endpoint de regresión lineal
      .then(async (res) => {
        if (!res.ok) throw new Error("Error al obtener imagen");
        const data = await res.json();
        const base64 = data.imagen;
        const mime = data.mime || "image/png";
        setImagen(`data:${mime};base64,${base64}`);
      })
      .catch((err) => {
        console.error("Error al cargar la imagen:", err);
      });
  }, []);

  return (
    <div className="crud-container" style={{ minHeight: "100vh" }}>
      <Navbar />
      <h2 className="crud-title" style={{ textAlign: "center", marginTop: "20px" }}>
        Gráfica de Regresión Lineal
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        {imagen ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              borderRadius: "12px",
              backgroundColor: "#fff",
            }}
          >
            <img
              src={imagen}
              alt="Gráfica de Regresión Lineal"
              style={{
                maxWidth: "600px",
                width: "100%",
                height: "auto",
                borderRadius: "8px",
              }}
            />
          </div>
        ) : (
          <p style={{ textAlign: "center", width: "100%" }}>Cargando imagen...</p>
        )}
      </div>
    </div>
  );
}
