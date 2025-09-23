// ProductForm.jsx
import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const ProductForm = ({ restauranteId, categorias, cepas, onCreated, closeModal }) => {
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
  const [loading, setLoading] = useState(false);

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
      const productsRef = doc(db, `restaurantes/${restauranteId}/productos`, formData.nombre);
      await setDoc(productsRef, {
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
      onCreated();
      closeModal();
    } catch (err) {
      console.error("Error creando producto:", err);
      alert("Error al crear el producto");
      setLoading(false);
    }
  };

  return (
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
            categoria: "",
          });
        }}
        required
      >
        <option value="">Seleccionar clasificación</option>
        <option value="menú">Menú</option>
        <option value="bebidas">Bebidas</option>
        <option value="vinos">Vinos</option>
        <option value="postres y digestivos">Postres y Digestivos</option>
      </select>

      {/* Categoría solo si NO es Menú */}
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
                cat.ubicacion.toLowerCase() === formData.clasificacion.toLowerCase()
            )
            .map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
        </select>
      )}

      {/* Cepa solo para vinos */}
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
  );
};

export default ProductForm;
