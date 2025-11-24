import { useState, useEffect } from "react";

function CartasNFC() {
  const [list, setList] = useState([]);
  const [cartas, setCartas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    id: null,
    id_chip: "",
    id_carta: "",
    propietario_actual: "",
  });

  const [modoEditar, setModoEditar] = useState(false);

  const API = "http://127.0.0.1:5000/cartas_nfc";
  const API_CARTAS = "http://127.0.0.1:5000/cartas";
  const API_USUARIOS = "http://127.0.0.1:5000/usuarios";

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchList(), fetchCartas(), fetchUsuarios()]);
    } catch {
      setError("Error al cargar datos");
    } finally {
      setLoading(false);
    }
  };

  const fetchList = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setList(data || []);
  };

  const fetchCartas = async () => {
    const res = await fetch(API_CARTAS);
    const data = await res.json();
    setCartas(data || []);
  };

  const fetchUsuarios = async () => {
    const res = await fetch(API_USUARIOS);
    const data = await res.json();
    setUsuarios(data || []);
  };

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      id: null,
      id_chip: "",
      id_carta: "",
      propietario_actual: "",
    });
    setModoEditar(false);
  };

  const validarForm = () => {
    if (!form.id_chip || !form.id_carta || !form.propietario_actual) {
      setError("Completa todos los campos");
      return false;
    }
    return true;
  };

  const crear = async (e) => {
    e.preventDefault();
    if (!validarForm()) return;

    const body = {
      id_chip: form.id_chip,
      id_carta: form.id_carta,
      propietario_actual: form.propietario_actual,
    };

    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json();
      setError(err.error || "Error al crear");
      return;
    }

    fetchList();
    resetForm();
  };

  const cargarEdicion = (item) => {
    setModoEditar(true);
    setForm({
      id: item._id,
      id_chip: item.id_chip,
      id_carta: item.id_carta,
      propietario_actual: item.propietario_actual,
    });
  };

  const guardar = async (e) => {
    e.preventDefault();
    if (!validarForm()) return;

    const body = {
      id_chip: form.id_chip,
      id_carta: form.id_carta,
      propietario_actual: form.propietario_actual,
    };

    const res = await fetch(`${API}/${form.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json();
      setError(err.error || "Error al actualizar");
      return;
    }

    fetchList();
    resetForm();
  };

  const eliminar = async (id) => {
    if (!confirm("¿Eliminar registro?")) return;
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchList();
  };

  const nombreCarta = (id) =>
    cartas.find((c) => c._id === id)?.nombre || "—";

  const nombreUsuario = (id) =>
    usuarios.find((u) => u._id === id)?.nickname || "—";

  return (
    <div>
      <h2>Administración de Cartas NFC</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={modoEditar ? guardar : crear}>
        <label>ID Chip (Física):</label>
        <input
          type="text"
          name="id_chip"
          value={form.id_chip}
          onChange={manejarCambio}
        />

        <label>Carta:</label>
        <select
          name="id_carta"
          value={form.id_carta}
          onChange={manejarCambio}
        >
          <option value="">Selecciona</option>
          {cartas.map((c) => (
            <option key={c._id} value={c._id}>
              {c.nombre}
            </option>
          ))}
        </select>

        <label>Propietario actual:</label>
        <select
          name="propietario_actual"
          value={form.propietario_actual}
          onChange={manejarCambio}
        >
          <option value="">Selecciona</option>
          {usuarios.map((u) => (
            <option key={u._id} value={u._id}>
              {u.nickname}
            </option>
          ))}
        </select>

        <button type="submit">
          {modoEditar ? "Guardar" : "Crear"}
        </button>

        {modoEditar && (
          <button type="button" onClick={resetForm}>
            Cancelar
          </button>
        )}
      </form>

      <table>
        <thead>
          <tr>
            <th>ID Chip</th>
            <th>ID Mongo</th>
            <th>Carta</th>
            <th>Propietario</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {list.map((item) => (
            <tr key={item._id}>
              <td>{item.id_chip}</td>
              <td>{item._id}</td>
              <td>{nombreCarta(item.id_carta)}</td>
              <td>{nombreUsuario(item.propietario_actual)}</td>
              <td>
                <button onClick={() => cargarEdicion(item)}>Editar</button>
                <button onClick={() => eliminar(item._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CartasNFC;
