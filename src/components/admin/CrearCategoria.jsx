import React, { useState } from "react";
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const CrearCategoria = ({ restauranteId, onCreate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    activo: true,
    ubicacion: "",
    prioridad: 0,
  });
  const [loading, setLoading] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre) {
      alert("El nombre es obligatorio");
      return;
    }

    setLoading(true);

    try {
      // Creamos el doc con id = nombre
      const categoriaRef = doc(db, `restaurantes/${restauranteId}/categorias`, formData.nombre);
      await setDoc(categoriaRef, formData);

      setLoading(false);
      setIsOpen(false);
      alert("Categoría creada con éxito!");

      if (typeof onCreate === "function") onCreate();
      // Limpiar formulario
      setFormData({ nombre: "", activo: true, ubicacion: "", prioridad: 0 });
    } catch (err) {
      console.error("Error creando categoría:", err);
      alert("Error al crear la categoría. Reintenta.");
      setLoading(false);
    }
  };

  return (
    <>
      <button className="btn-create" onClick={openModal}>
        ➕ Crear Categoría
      </button>

      {isOpen && (
        <div className="modal" onMouseDown={closeModal}>
          <div
            className="modal-content"
            onMouseDown={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <h3>Nueva Categoría</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                required
              />
              <select
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar ubicación</option>
                <option value="Menu">Menú</option>
                <option value="Bebidas">Bebidas</option>
                <option value="Vinos">Vinos</option>
                <option value="Postres y Digestivos">Postres y Digestivos</option>
              </select>
              <input
                type="number"
                name="prioridad"
                value={formData.prioridad}
                onChange={handleChange}
                placeholder="Prioridad"
              />
              <label>
                <input
                  type="checkbox"
                  name="activo"
                  checked={formData.activo}
                  onChange={handleChange}
                />{" "}
                Activo
              </label>

              <div className="modal-actions">
                <button type="submit" disabled={loading}>
                  {loading ? "Creando..." : "Crear"}
                </button>
                <button type="button" onClick={closeModal}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CrearCategoria;
