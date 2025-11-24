import { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import "../../../styles/App.css";

function CartasNFC() {
  const [cartas, setCartas] = useState([]);
  const [catalogoCartas, setCatalogoCartas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [form, setForm] = useState({
    id: null,
    id_chip: "",
    id_carta: "",
    propietario_actual: "",
  });

  const [modoEditar, setModoEditar] = useState(false);
  const API_URL = "http://127.0.0.1:5000/cartas_nfc";

  useEffect(() => {
    fetchCartasNFC();
    fetchCatalogoCartas();
    fetchUsuarios();
  }, []);

  const fetchCartasNFC = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setCartas(
        data.map((c) => ({
          id: c._id,
          id_chip: c.id_chip,
          id_carta: c.id_carta,
          propietario_actual: c.propietario_actual,
        }))
      );
    } catch (err) {
      console.error("Error al cargar cartas NFC:", err);
    }
  };

  const fetchCatalogoCartas = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/cartas");
      const data = await res.json();
      setCatalogoCartas(data.map((c) => ({ id: c._id, nombre: c.nombre })));
    } catch (err) {
      console.error("Error al cargar catálogo de cartas:", err);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/usuarios");
      const data = await res.json();
      setUsuarios(data.map((u) => ({ id: u._id, nickname: u.nickname })));
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
    }
  };

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ id: null, id_chip: "", id_carta: "", propietario_actual: "" });
  };

  const crearCarta = async (e) => {
    e.preventDefault();
    try {
      const nueva = { ...form };
      delete nueva.id;
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nueva),
      });
      if (!res.ok) throw new Error("Error al crear tarjeta NFC");
      resetForm();
      fetchCartasNFC();
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
      if (!res.ok) throw new Error("Error al actualizar tarjeta NFC");
      setModoEditar(false);
      resetForm();
      fetchCartasNFC();
    } catch (err) {
      console.error(err);
    }
  };

  const eliminarCarta = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar tarjeta NFC");
      fetchCartasNFC();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="crud-container">
      <Navbar />
      <h2 className="crud-title">Administración de Cartas NFC</h2>

      {/* FORMULARIO */}
      <form
        className="crud-form"
        onSubmit={modoEditar ? guardarEdicion : crearCarta}
      >
        <input
          type="text"
          name="id_chip"
          placeholder="ID del chip NFC"
          value={form.id_chip}
          onChange={manejarCambio}
          required
        />

        <select
          name="id_carta"
          value={form.id_carta}
          onChange={manejarCambio}
          required
        >
          <option value="">-- Selecciona una carta --</option>
          {catalogoCartas.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>

        <select
          name="propietario_actual"
          value={form.propietario_actual}
          onChange={manejarCambio}
        >
          <option value="">-- Selecciona propietario --</option>
          {usuarios.map((u) => (
            <option key={u.id} value={u.id}>
              {u.nickname}
            </option>
          ))}
        </select>

        <button className="crud-btn">
          {modoEditar ? "Guardar Cambios" : "Registrar NFC"}
        </button>
      </form>

      {/* TABLA */}
      <div className="table-wrapper">
        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Chip</th>
              <th>Carta</th>
              <th>Propietario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cartas.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.id_chip}</td>
                <td>{c.id_carta}</td>
                <td>{c.propietario_actual}</td>
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

export default CartasNFC;
