import { useState } from "react";
import "../../styles/login.css";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nickname: "DarkMage",
      correo: "carlos@example.com",
      contraseña: "123456",
      telefono: "5512345678",
      estado_cuenta: "Activa",
      rol: "Administrador",
    },
    {
      id: 2,
      nickname: "FireQueen",
      correo: "ana@example.com",
      contraseña: "abcdef",
      telefono: "5598765432",
      estado_cuenta: "Suspendida",
      rol: "Usuario",
    },
  ]);

  const [form, setForm] = useState({
    id: null,
    nickname: "",
    correo: "",
    contraseña: "",
    telefono: "",
    estado_cuenta: "",
    rol: "",
  });

  const [modoEditar, setModoEditar] = useState(false);

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const crearUsuario = (e) => {
    e.preventDefault();
    setUsuarios([
      ...usuarios,
      { id: Date.now(), ...form },
    ]);

    resetForm();
  };

  const cargarEdicion = (usuario) => {
    setModoEditar(true);
    setForm(usuario);
  };

  const guardarEdicion = (e) => {
    e.preventDefault();
    setUsuarios(
      usuarios.map((u) => (u.id === form.id ? form : u))
    );

    setModoEditar(false);
    resetForm();
  };

  const eliminarUsuario = (id) => {
    setUsuarios(usuarios.filter((u) => u.id !== id));
  };

  const resetForm = () => {
    setForm({
      id: null,
      nickname: "",
      correo: "",
      contraseña: "",
      telefono: "",
      estado_cuenta: "",
      rol: "",
    });
  };

  return (
    <div
      className="container-fluid min-vh-100 py-4"
      style={{ backgroundColor: "#121212", color: "white" }}
    >
      <div className="container">

        <h2 className="mb-4 text-white">Administración de usuarios</h2>

        {/* FORMULARIO */}
        <form
          onSubmit={modoEditar ? guardarEdicion : crearUsuario}
          className="p-3 rounded"
          style={{ backgroundColor: "#1e1e1e" }}
        >
          <div className="row">
            <div className="col-md-4 mb-3">
              <input
                type="text"
                name="nickname"
                placeholder="Nickname"
                value={form.nickname}
                onChange={manejarCambio}
                className="form-control dark-input"
                required
              />
            </div>

            <div className="col-md-4 mb-3">
              <input
                type="email"
                name="correo"
                placeholder="Correo"
                value={form.correo}
                onChange={manejarCambio}
                className="form-control dark-input"
                required
              />
            </div>

            <div className="col-md-4 mb-3">
              <input
                type="password"
                name="contraseña"
                placeholder="Contraseña"
                value={form.contraseña}
                onChange={manejarCambio}
                className="form-control dark-input"
                required
              />
            </div>

            <div className="col-md-4 mb-3">
              <input
                type="text"
                name="telefono"
                placeholder="Teléfono"
                value={form.telefono}
                onChange={manejarCambio}
                className="form-control dark-input"
              />
            </div>

            <div className="col-md-4 mb-3">
              <select
                name="estado_cuenta"
                value={form.estado_cuenta}
                onChange={manejarCambio}
                className="form-control dark-input"
                required
              >
                <option value="">Estado de cuenta</option>
                <option value="Activa">Activa</option>
                <option value="Suspendida">Suspendida</option>
                <option value="Bloqueada">Bloqueada</option>
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <select
                name="rol"
                value={form.rol}
                onChange={manejarCambio}
                className="form-control dark-input"
                required
              >
                <option value="">Rol</option>
                <option value="Administrador">Administrador</option>
                <option value="Usuario">Usuario</option>
                <option value="Supervisor">Supervisor</option>
              </select>
            </div>
          </div>

          <button
            className="btn btn-gradient w-100 py-2 mt-2"
            style={{
              border: "none",
              color: "white",
              fontWeight: "bold",
              borderRadius: "10px",
            }}
          >
            {modoEditar ? "Guardar Cambios" : "Agregar Usuario"}
          </button>
        </form>

        {/* TABLA */}
        <table className="table table-dark table-striped mt-4">
          <thead>
            <tr>
              <th>Nickname</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Estado</th>
              <th>Rol</th>
              <th style={{ width: "170px" }}>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.nickname}</td>
                <td>{u.correo}</td>
                <td>{u.telefono}</td>
                <td>{u.estado_cuenta}</td>
                <td>{u.rol}</td>
                <td>
                  <button
                    onClick={() => cargarEdicion(u)}
                    className="btn btn-sm btn-gradient me-2"
                    style={{ border: "none", color: "white", fontWeight: "bold" }}
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => eliminarUsuario(u.id)}
                    className="btn btn-sm btn-gradient me-2"
                    style={{ border: "none", color: "white", fontWeight: "bold" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default Usuarios;
