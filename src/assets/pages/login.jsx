import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");

  const navigate = useNavigate();

  const manejarSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/login/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, contraseña }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Error al iniciar sesión");
        return;
      }

      alert("Login exitoso");

      // Guardar autenticación
      localStorage.setItem("auth", "true");
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <section className="gradient-form">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">

            <div className="card">
              <div className="row g-0">

                {/* PANEL IZQUIERDO */}
                <div className="col-lg-6">
                  <div className="card-body p-md-5">

                    <div className="text-center">
                      <img
                        src="../../public/images/arkana.png"
                        style={{ width: 180 }}
                        alt="logo"
                      />
                      <h4 className="mt-4 mb-5">Bienvenido administrador</h4>
                    </div>

                    <form onSubmit={manejarSubmit}>

                      <div className="mb-4">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control dark-input"
                          placeholder="Ingresa tu email"
                          value={correo}
                          onChange={(e) => setCorreo(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="form-label">Contraseña</label>
                        <input
                          type="password"
                          className="form-control dark-input"
                          placeholder="Ingresa tu contraseña"
                          value={contraseña}
                          onChange={(e) => setContraseña(e.target.value)}
                          required
                        />
                      </div>

                      <button type="submit" className="btn btn-gradient mt-3">
                        Entrar
                      </button>

                    </form>

                  </div>
                </div>

                {/* PANEL DERECHO */}
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="px-4">
                    <h4 className="mb-4">Arkana</h4>
                    <p>
                      Plataforma interna para la gestión, control y
                      administración del sistema de cartas NFC. Acceso exclusivo
                      para administradores autorizados.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
