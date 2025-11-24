import { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import "../../../styles/App.css";

function Cartas() {
  const [cartas, setCartas] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nombre: "",
    descripcion: "",
    tipo: "",
    rareza: "",
    vida: "",
    daño: "",
    velocidad: "",
    mana: "",
    ilustracion_url: "",
  });

  const [modoEditar, setModoEditar] = useState(false);
  const API_URL = "http://127.0.0.1:5000/cartas";

  useEffect(() => {
    fetchCartas();
  }, []);

  const parseFecha = (valor) => {
    if (!valor) return "";
    const fecha = new Date(valor);
    return isNaN(fecha) ? "" : fecha.toLocaleString();
  };

  const fetchCartas = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      const cartasTransformadas = data.map((c) => ({
        id: c._id,
        nombre: c.nombre,
        descripcion: c.descripcion,
        tipo: c.tipo,
        rareza: c.rareza,
        vida: c.vida,
        daño: c.daño,
        velocidad: c.velocidad,
        mana: c.mana,
        ilustracion_url: c.ilustracion_url,
        fecha_creacion: parseFecha(c.fecha_creacion),
      }));
      setCartas(cartasTransformadas);
    } catch (err) {
      console.error("Error al cargar cartas:", err);
    }
  };

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      id: null,
      nombre: "",
      descripcion: "",
      tipo: "",
      rareza: "",
      vida: "",
      daño: "",
      velocidad: "",
      mana: "",
      ilustracion_url: "",
    });
  };

  const crearCarta = async (e) => {
    e.preventDefault();
    try {
      const nuevaCarta = { ...form };
      delete nuevaCarta.id;
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaCarta),
      });
      if (!res.ok) throw new Error("Error al crear carta");
      resetForm();
      fetchCartas();
    } catch (err) {
      console.error(err);
    }
  };

  const cargarEdicion = (carta) => {
    setModoEditar(true);
    setForm(carta);
  };

  const guardarEdicion = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Error al actualizar carta");
      setModoEditar(false);
      resetForm();
      fetchCartas();
    } catch (err) {
      console.error(err);
    }
  };

  const eliminarCarta = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar carta");
      fetchCartas();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="crud-container">
      <Navbar />
      <h2 className="crud-title">Administración de Cartas</h2>

      {/* FORMULARIO */}
      <form
        className="crud-form"
        onSubmit={modoEditar ? guardarEdicion : crearCarta}
      >
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={manejarCambio}
          required
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={manejarCambio}
        />
        <input
          type="text"
          name="tipo"
          placeholder="Tipo"
          value={form.tipo}
          onChange={manejarCambio}
        />
        <input
          type="text"
          name="rareza"
          placeholder="Rareza"
          value={form.rareza}
          onChange={manejarCambio}
        />
        <input
          type="number"
          name="vida"
          placeholder="Vida"
          value={form.vida}
          onChange={manejarCambio}
        />
        <input
          type="number"
          name="daño"
          placeholder="Daño"
          value={form.daño}
          onChange={manejarCambio}
        />
        <input
          type="number"
          name="velocidad"
          placeholder="Velocidad"
          value={form.velocidad}
          onChange={manejarCambio}
        />
        <input
          type="number"
          name="mana"
          placeholder="Mana"
          value={form.mana}
          onChange={manejarCambio}
        />
        <input
          type="text"
          name="ilustracion_url"
          placeholder="URL de la ilustración"
          value={form.ilustracion_url}
          onChange={manejarCambio}
        />
        <button className="crud-btn">
          {modoEditar ? "Guardar Cambios" : "Agregar Carta"}
        </button>
      </form>

      {/* TABLA */}
      <div className="table-wrapper">
        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Tipo</th>
              <th>Rareza</th>
              <th>Vida</th>
              <th>Daño</th>
              <th>Velocidad</th>
              <th>Mana</th>
              <th>Ilustración</th>
              <th>Fecha creación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cartas.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.nombre}</td>
                <td>{c.descripcion}</td>
                <td>{c.tipo}</td>
                <td>{c.rareza}</td>
                <td>{c.vida}</td>
                <td>{c.daño}</td>
                <td>{c.velocidad}</td>
                <td>{c.mana}</td>
                <td>
                  {c.ilustracion_url ? (
                    <img
                      src={c.ilustracion_url}
                      alt={c.nombre}
                      style={{ width: "50px", borderRadius: "5px" }}
                    />
                  ) : (
                    "—"
                  )}
                </td>
                <td>{c.fecha_creacion}</td>
                <td>
                  <button
                    className="crud-edit"
                    onClick={() => cargarEdicion(c)}
                  >
                    Editar
                  </button>
                  <button
                    className="crud-delete"
                    onClick={() => eliminarCarta(c.id)}
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

export default Cartas;
