import { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import "../../../styles/App.css";

function Usuarios() {
  const [mostrarContrasena, setMostrarContrasena] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
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

  const API_URL = "http://127.0.0.1:5000/usuarios";

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const parseFecha = (valor) => {
    if (!valor) return "";
    if (typeof valor === "object" && valor.$date) {
      return new Date(valor.$date).toLocaleString();
    }
    if (typeof valor === "string") {
      const fecha = new Date(valor);
      return isNaN(fecha) ? "" : fecha.toLocaleString();
    }
    return "";
  };

  const fetchUsuarios = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      const usuariosTransformados = data.map((u) => ({
        id: u._id,
        nickname: u.nickname,
        correo: u.correo,
        contraseña: u.contraseña_hash || u.contraseña || "",
        telefono: u.telefono,
        estado_cuenta: u.estado_cuenta,
        rol: u.rol,
        fecha_registro: parseFecha(u.fecha_registro),
        ultimo_login: parseFecha(u.ultimo_login),
      }));

      setUsuarios(usuariosTransformados);
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
    }
  };

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

  const crearUsuario = async (e) => {
    e.preventDefault();
    try {
      const usuarioNuevo = {
        nickname: form.nickname,
        correo: form.correo,
        contraseña: form.contraseña,
        telefono: form.telefono,
        estado_cuenta: form.estado_cuenta,
        rol: form.rol,
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioNuevo),
      });

      if (!res.ok) throw new Error("Error al crear usuario");

      resetForm();
      fetchUsuarios();
    } catch (err) {
      console.error(err);
    }
  };

  const cargarEdicion = (usuario) => {
    setModoEditar(true);
    setForm(usuario);
  };

  const guardarEdicion = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Error al actualizar usuario");

      setModoEditar(false);
      resetForm();
      fetchUsuarios();
    } catch (err) {
      console.error(err);
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar usuario");
      fetchUsuarios();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="crud-container">
      <Navbar />
      <h2 className="crud-title">Administración de Usuarios</h2>

      {/* FORMULARIO */}
      <form className="crud-form" onSubmit={modoEditar ? guardarEdicion : crearUsuario}>
        <input
          type="text"
          name="nickname"
          placeholder="Nickname"
          value={form.nickname}
          onChange={manejarCambio}
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={form.correo}
          onChange={manejarCambio}
          required
        />
        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          value={form.contraseña}
          onChange={manejarCambio}
          required
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={manejarCambio}
        />
        <select
          name="estado_cuenta"
          value={form.estado_cuenta}
          onChange={manejarCambio}
          required
        >
          <option value="">Estado de cuenta</option>
          <option value="activo">Activo</option>
          <option value="suspendida">Suspendida</option>
          <option value="bloqueada">Bloqueada</option>
        </select>
        <select
          name="rol"
          value={form.rol}
          onChange={manejarCambio}
          required
        >
          <option value="">Rol</option>
          <option value="jugador">Jugador</option>
          <option value="admin">Administrador</option>
          <option value="supervisor">Supervisor</option>
        </select>
        <button className="crud-btn">{modoEditar ? "Guardar Cambios" : "Agregar Usuario"}</button>
      </form>

      {/* TABLA */}
      <div className="table-wrapper">
        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nickname</th>
              <th>Correo</th>
              <th>Contraseña</th>
              <th>Teléfono</th>
              <th>Estado</th>
              <th>Rol</th>
              <th>Fecha registro</th>
              <th>Último login</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nickname}</td>
                <td>{u.correo}</td>
                <td
  className="password-cell"
  onClick={() =>
    setMostrarContrasena(mostrarContrasena === u.id ? null : u.id)
  }
>
  {mostrarContrasena === u.id ? u.contraseña : u.contraseña.replace(/./g, "•")}
</td>

                <td>{u.telefono}</td>
                <td>{u.estado_cuenta}</td>
                <td>{u.rol}</td>
                <td>{u.fecha_registro}</td>
                <td>{u.ultimo_login}</td>
                <td>
                  <button className="crud-edit" onClick={() => cargarEdicion(u)}>Editar</button>
                  <button className="crud-delete" onClick={() => eliminarUsuario(u.id)}>Eliminar</button>
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
