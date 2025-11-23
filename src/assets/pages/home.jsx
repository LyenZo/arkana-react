import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="container-fluid min-vh-100 py-4"
      style={{ backgroundColor: "#121212", color: "white" }}
    >
      <div className="container">

        <h1 className="mb-3">Panel de Administración</h1>
        <p style={{ color: "#ffffff" }}>
          Bienvenido al sistema administrador del juego de cartas NFC.
        </p>

        {/* Accesos rápidos */}
        <h3 className="mt-3 mb-3">Accesos rápidos</h3>

        <div className="row">

          <div className="col-md-4 mb-3">
            <button
              className="btn w-100 py-2 btn-gradient"
              style={{
                border: "none",
                color: "white",
                fontWeight: "bold",
                borderRadius: "10px",
              }}
              onClick={() => navigate("/usuarios")}
            >
              Administrar usuarios
            </button>
          </div>

          <div className="col-md-4 mb-3">
            <button
              className="btn w-100 py-2 btn-gradient"
              style={{
                border: "none",
                color: "white",
                fontWeight: "bold",
                borderRadius: "10px",
              }}
              onClick={() => navigate("/cartas")}
            >
              Administrar cartas
            </button>
          </div>

          <div className="col-md-4 mb-3">
            <button
              className="btn w-100 py-2 btn-gradient"
              style={{
                border: "none",
                color: "white",
                fontWeight: "bold",
                borderRadius: "10px",
              }}
              onClick={() => navigate("/sanciones")}
            >
              Administrar sanciones
            </button>
          </div>

        </div>

        {/* Tarjetas de estadísticas */}
        <div className="row mt-4">

          <div className="col-md-4 mb-3">
            <div
              className="card shadow-sm"
              style={{ backgroundColor: "#1e1e1e", color: "white", border: "none" }}
            >
              <div className="card-body">
                <h5 className="card-title text-light">Usuarios activos</h5>
                <p className="card-text display-6">124</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div
              className="card shadow-sm"
              style={{ backgroundColor: "#1e1e1e", color: "white", border: "none" }}
            >
              <div className="card-body">
                <h5 className="card-title text-light">Cartas registradas</h5>
                <p className="card-text display-6">320</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div
              className="card shadow-sm"
              style={{ backgroundColor: "#1e1e1e", color: "white", border: "none" }}
            >
              <div className="card-body">
                <h5 className="card-title text-light">Lecturas NFC hoy</h5>
                <p className="card-text display-6">48</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Home;
