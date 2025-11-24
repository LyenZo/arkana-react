import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/App.css";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  const manejarSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/login/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contraseña }),
      });

      const data = await response.json();

      if (!response.ok) return alert(data.error || "Error al iniciar sesión");

      alert("Login exitoso");
      localStorage.setItem("auth", "true");
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      navigate("/");
    } catch (error) {
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="login-wrapper">

      {/* LADO IZQUIERDO (AZUL) */}
      <div className="login-left">
        <div className="logo-box">
          <img 
            src="../../images/arkana.png" 
            className="logo"
            alt="logo"
          />
          <h2 className="logo-title">PROJECTO ARKANA</h2>

        </div>
      </div>

      {/* LADO DERECHO (FORM CARD) */}
      <div className="login-right">
        <div className="login-card">

          <h1 className="title">Bienvenido</h1>
          <p className="subtitle">Inicia sesión en tu cuenta para continuar</p>

          <form onSubmit={manejarSubmit}>

            <input
              type="email"
              placeholder="Correo"
              className="input-modern"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Contraseña"
              className="input-modern"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
            <button type="submit" className="btn-login">Iniciar Sesión </button>

            <p className="signup">
              ¿No tienes una cuenta? <a href="#">Contáctanos</a>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
