import { useEffect, useState } from "react";

export default function GraficaRegresion() {
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/regresionM")
      .then(async (res) => {
        if (!res.ok) throw new Error("Error al obtener imagen");

        const data = await res.json();
        const base64 = data.imagen;
        const mime = data.mime || "image/png";

        setImgSrc(`data:${mime};base64,${base64}`);
      })
      .catch((err) => {
        console.error("Error al cargar la imagen:", err);
      });
  }, []);

  return (
    <div>
      <h2>Gráfica de Regresión</h2>
      {imgSrc ? (
        <img
          src={imgSrc}
          alt="Gráfica de regresión"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      ) : (
        <p>Cargando imagen...</p>
      )}
    </div>
  );
}
