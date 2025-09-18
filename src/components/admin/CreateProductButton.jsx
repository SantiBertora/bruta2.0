import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useAuth } from "../../context/AuthContext";

const CreateProductButton = ({ onCreate, categorias, cepas }) => {
  const { isAdmin, restauranteId } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    picante: false,
    veggie: false,
    sinGluten: false,
    activo: true,
    foto: "",
    clasificacion: "",
    categoria: "",
    cepa: "",
  });

  if (!isAdmin) return null;

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
    setLoading(true);

    try {
      const productsRef = collection(
        db,
        `restaurantes/${restauranteId}/productos`
      );
      await addDoc(productsRef, {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: Number(formData.precio),
        picante: formData.picante,
        veggie: formData.veggie,
        sinGluten: formData.sinGluten,
        activo: formData.activo,
        img: formData.foto || "",
        clasificacion: formData.clasificacion,
        cat: formData.clasificacion === "menú" ? null : formData.categoria,
        cepa: formData.clasificacion === "vinos" ? formData.cepa : null,
        createdAt: new Date(),
      });

      setLoading(false);
      setIsOpen(false);
      alert("Producto creado con éxito!");

      if (typeof onCreate === "function") {
        onCreate();
      } else {
        window.location.reload();
      }
    } catch (err) {
      console.error("Error creando producto:", err);
      alert("Error al crear el producto. Reintenta.");
      setLoading(false);
    }
  };

  return (
    <>
      <button type="button" className="btn-create" onClick={openModal}>
        ➕ Crear Producto
      </button>

      {isOpen && (
        <div className="modal" onMouseDown={closeModal}>
          <div
            className="modal-content"
            onMouseDown={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <h3>Nuevo Producto</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                required
              />
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Descripción"
              />
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                placeholder="Precio"
                required
              />
              <input
                type="text"
                name="foto"
                value={formData.foto}
                onChange={handleChange}
                placeholder="URL de la foto"
              />

              {/* Clasificación */}
              <select
                name="clasificacion"
                value={formData.clasificacion}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    clasificacion: e.target.value,
                    categoria: "", // reseteamos la categoría si cambia la clasificacion
                  });
                }}
                required
              >
                <option value="">Seleccionar clasificación</option>
                <option value="menú">Menú</option>
                <option value="bebidas">Bebidas</option>
                <option value="vinos">Vinos</option>
                <option value="postres y digestivos">
                  Postres y Digestivos
                </option>
              </select>

              {/* Categoría solo si la clasificación NO es Menú */}
              {formData.clasificacion && formData.clasificacion.toLowerCase() !== "menú" && (
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  {categorias
                    ?.filter(
                      (cat) =>
                        cat.ubicacion.toLowerCase() ==
                        formData.clasificacion.toLowerCase()
                    )
                    .map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nombre}
                      </option>
                    ))}
                </select>
              )}
              {/* Cepa (solo para vinos) */}
              {formData.clasificacion === "vinos" && (
                <select
                  name="cepa"
                  value={formData.cepa}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar cepa</option>
                  {cepas?.map((cepa) => (
                    <option key={cepa.id} value={cepa.id}>
                      {cepa.nombre}
                    </option>
                  ))}
                </select>
              )}
              <label>
                <input
                  type="checkbox"
                  name="picante"
                  checked={formData.picante}
                  onChange={handleChange}
                />{" "}
                Picante
              </label>
              <label>
                <input
                  type="checkbox"
                  name="veggie"
                  checked={formData.veggie}
                  onChange={handleChange}
                />{" "}
                Veggie
              </label>
              <label>
                <input
                  type="checkbox"
                  name="sinGluten"
                  checked={formData.sinGluten}
                  onChange={handleChange}
                />{" "}
                Sin Gluten
              </label>
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
                  {loading ? "Guardando..." : "Crear"}
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

export default CreateProductButton;
