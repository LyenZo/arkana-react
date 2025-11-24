import Navbar from "../../components/navbar";
import "../../../styles/App.css";

function Sanciones() {
  return (
    <div
      className="crud-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh", // ajusta según quieras más espacio arriba/abajo
        textAlign: "center",
      }}
    >
      <Navbar />
      <h2 className="crud-title">Administración de Sanciones</h2>
      <h3>Proximamente...</h3>
      <img
        style={{ height: "460px", marginTop: "20px" }}
        src="../../../images/bear.png"
        alt="Bear"
      />
    </div>
  );
}

export default Sanciones;
