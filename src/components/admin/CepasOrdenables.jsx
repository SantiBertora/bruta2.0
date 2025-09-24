import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { db } from "../../firebase/firebaseConfig";
import { doc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";

const CepasOrdenables = ({ restauranteId, cepas = [], onSave }) => {
  const [data, setData] = useState({});
  const [openGroup, setOpenGroup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCepa, setNewCepa] = useState({ nombre: "", activo: true, ubicacion: "", prioridad: 0 });

  useEffect(() => {
    // Agrupamos por ubicación y ordenamos por prioridad
    const grupos = {};
    cepas.forEach((c) => {
      const key = c.ubicacion || "sin_ubicacion";
      if (!grupos[key]) grupos[key] = [];
      grupos[key].push(c);
    });

    Object.keys(grupos).forEach((key) => {
      grupos[key].sort((a, b) => (a.prioridad ?? 0) - (b.prioridad ?? 0));
    });

    setData(grupos);
  }, [cepas]);

  const handleDragEnd = (result, ubicacion) => {
    if (!result.destination) return;
    const items = Array.from(data[ubicacion]);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    setData({ ...data, [ubicacion]: items });
  };

  const handleDelete = async (cepaId) => {
    if (!window.confirm("¿Deseas eliminar esta cepa?")) return;
    try {
      const ref = doc(db, `restaurantes/${restauranteId}/cepas/${cepaId}`);
      await deleteDoc(ref);
      // Actualizamos localmente
      const newData = { ...data };
      Object.keys(newData).forEach((key) => {
        newData[key] = newData[key].filter(c => c.id !== cepaId);
      });
      setData(newData);
    } catch (err) {
      console.error(err);
      alert("Error al eliminar la cepa");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newCepa.nombre) return alert("El nombre es obligatorio");
    try {
      const ref = doc(db, `restaurantes/${restauranteId}/cepas`, newCepa.nombre);
      await setDoc(ref, newCepa);
      const key = newCepa.ubicacion || "sin_ubicacion";
      setData(prev => ({
        ...prev,
        [key]: [...(prev[key] || []), { id: newCepa.nombre, ...newCepa }],
      }));
      setNewCepa({ nombre: "", activo: true, ubicacion: "", prioridad: 0 });
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error al crear la cepa");
    }
  };

  const handleSave = () => {
    const cambios = [];
    Object.keys(data).forEach((ubicacion) => {
      data[ubicacion].forEach((c, index) => {
        cambios.push({ ...c, prioridad: index });
      });
    });
    if (typeof onSave === "function") onSave(cambios);
  };

  return (
    <div className="cepas-admin">
      <h3>Ordenar Cepas</h3>

      {Object.keys(data).map((ubicacion) => (
        <div key={ubicacion} className="ubicacion-group">
          <button
            className="toggle-group"
            onClick={() => setOpenGroup(openGroup === ubicacion ? null : ubicacion)}
          >
            {openGroup === ubicacion ? "▼" : "▶"} {ubicacion}
          </button>

          {openGroup === ubicacion && (
            <DragDropContext onDragEnd={(result) => handleDragEnd(result, ubicacion)}>
              <Droppable droppableId={ubicacion}>
                {(provided) => (
                  <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {data[ubicacion].map((cepa, index) => (
                      <Draggable key={cepa.id} draggableId={cepa.id} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {cepa.nombre} (prioridad: {cepa.prioridad ?? index})
                            <button onClick={() => handleDelete(cepa.id)}>🗑️</button>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      ))}

      <button className="btn-save" onClick={handleSave}>Guardar cambios</button>
      <button className="btn-create" onClick={() => setIsModalOpen(true)}>➕ Crear Cepa</button>

      {isModalOpen && (
        <div className="modal" onMouseDown={() => setIsModalOpen(false)}>
          <div className="modal-content" onMouseDown={(e) => e.stopPropagation()}>
            <h3>Nueva Cepa</h3>
            <form onSubmit={handleCreate}>
              <input
                type="text"
                value={newCepa.nombre}
                onChange={(e) => setNewCepa({ ...newCepa, nombre: e.target.value })}
                placeholder="Nombre"
                required
              />
              <input
                type="text"
                value={newCepa.ubicacion}
                onChange={(e) => setNewCepa({ ...newCepa, ubicacion: e.target.value })}
                placeholder="Ubicación"
              />
              <input
                type="number"
                value={newCepa.prioridad}
                onChange={(e) => setNewCepa({ ...newCepa, prioridad: Number(e.target.value) })}
                placeholder="Prioridad"
              />
              <label>
                <input
                  type="checkbox"
                  checked={newCepa.activo}
                  onChange={(e) => setNewCepa({ ...newCepa, activo: e.target.checked })}
                /> Activo
              </label>
              <div className="modal-actions">
                <button type="submit">Crear</button>
                <button type="button" onClick={() => setIsModalOpen(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CepasOrdenables;
