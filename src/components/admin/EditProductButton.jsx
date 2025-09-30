// src/utils/EditProductButton.jsx
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useAuth } from "../../context/AuthContext";

const EditProductButton = ({ product, onUpdated,banderas }) => {
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
    activo: false,
    origen: "",
    clasificacion: "",
  });

  useEffect(() => {
      if (product) {
        console.log("Producto recibido:", product);
    setFormData({
      nombre: product.nombre || "",
      descripcion: product.descripcion || "",
      precio: product.precio ?? "",
      picante: !!product.picante,
      veggie: !!product.veggie,
      sinGluten: !!product.sinGluten,
      activo: !!product.activo,
      origen: product.origen || "",
      clasificacion: product.clasificacion?.toLowerCase() || "",
    });
  }
  }, [product]);

  // cerrar con Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

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
    // cerramos modal antes de la actualización para evitar re-aperturas por re-render
    closeModal();
    setLoading(true);

    try {
      const productRef = doc(db, `restaurantes/${restauranteId}/productos`, product.id);
      await updateDoc(productRef, {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: Number(formData.precio),
        picante: !!formData.picante,
        veggie: !!formData.veggie,
        sinGluten: !!formData.sinGluten,
        clasificacion: formData.clasificacion?.toLowerCase() || "",
        activo: !!formData.activo,
        ...(product.clasificacion?.toLowerCase() === "vinos" && {
          origen: formData.origen || "",
        })
      });

      setLoading(false);
      alert("Producto actualizado con éxito!");
      if (typeof onUpdated === "function") {
        onUpdated();
      } else {
        // fallback si no hay callback: recargar
        window.location.reload();
      }
    } catch (err) {
      console.error("Error actualizando producto:", err);
      setLoading(false);
      alert("Error al actualizar el producto. Reintentá.");
      // reabrimos para permitir corrección
      setIsOpen(true);
    }
  };

  // modal JSX (portal)
  const modal = (
    <div
      className="modal-overlay"
      onClick={closeModal}
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.45)",
        zIndex: 2000,
      }}
    >
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          padding: "1.25rem",
          borderRadius: 8,
          width: "min(96%, 460px)",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 6px 24px rgba(0,0,0,0.2)",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Editar Producto</h3>
        <form onSubmit={handleSubmit}>
          <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input type="checkbox" name="activo" checked={formData.activo} onChange={(e) => setFormData({ ...formData, activo: e.target.checked})} />
              Activo
            </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
            style={{ width: "100%", marginBottom: 8, padding: 8 }}
          />
          <div style={{ margin: "12px 0" }}>
            <label>
              Clasificación:
              <select
                name="clasificacion"
                value={formData.clasificacion}
                onChange={handleChange}
                style={{ width: "100%", padding: 8, marginTop: 4 }}
              >
                <option value="">Seleccionar...</option>
                <option value="vinos">Vino</option>
                <option value="menú">Plato</option>
                <option value="bebidas">Bebida</option>
                <option value="postres y digestivos">Postres y Digestivos</option>
                {/* Podés sumar más según tu app */}
              </select>
            </label>
          </div>
          {formData.clasificacion?.toLowerCase() === "vinos" && (
            <div style={{margin: "12px 0" }}>
              <label>
                Origen:
                <select
                  name="origen"
                  value={formData.origen}
                  onChange={handleChange}
                  style={{ width: "100%", marginTop: 4, padding: 8 }}
                >
                  <option value="">-- Seleccioná un origen --</option>
                  {banderas?.map((band) => (
                    <option key={band.nombre} value={band.nombre}>
                      {band.nombre}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}

          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
            style={{ width: "100%", marginBottom: 8, padding: 8 }}
          />
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            placeholder="Precio"
            required
            style={{ width: "100%", marginBottom: 8, padding: 8 }}
          />

          
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input type="checkbox" name="picante" checked={formData.picante} onChange={handleChange} />
              Picante
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input type="checkbox" name="veggie" checked={formData.veggie} onChange={handleChange} />
              Veggie
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input type="checkbox" name="sinGluten" checked={formData.sinGluten} onChange={handleChange} />
              Sin Gluten
            </label>
            
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginTop: 12 }}>
            <button type="submit" disabled={loading} style={{ padding: "8px 12px" }}>
              {loading ? "Guardando..." : "Guardar"}
            </button>
            <button type="button" onClick={closeModal} style={{ padding: "8px 12px" }}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <button type="button" className="btn-edit" onClick={openModal}>
        ✏️ Editar
      </button>

      {isOpen ? createPortal(modal, document.body) : null}
    </>
  );
};

export default EditProductButton;
