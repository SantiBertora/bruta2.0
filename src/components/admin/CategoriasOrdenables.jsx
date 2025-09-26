import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const CategoriasOrdenables = ({ categorias = [], onSave, onDelete }) => {
  const [data, setData] = useState({});
  const [openGroup, setOpenGroup] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // 👉 controla el desplegable principal

  useEffect(() => {
    const grupos = {};
    categorias.forEach((cat) => {
      const key = cat.ubicacion || "sin_ubicacion";
      if (!grupos[key]) grupos[key] = [];
      grupos[key].push(cat);
    });

    Object.keys(grupos).forEach((key) => {
      grupos[key].sort((a, b) => (a.prioridad ?? 0) - (b.prioridad ?? 0));
    });

    setData(grupos);
  }, [categorias]);

  const handleDragEnd = (result, ubicacion) => {
    if (!result.destination) return;

    const items = Array.from(data[ubicacion]);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    const newData = {
      ...data,
      [ubicacion]: items,
    };

    setData(newData);
  };

  const handleSave = () => {
    const cambios = [];
    Object.keys(data).forEach((ubicacion) => {
      data[ubicacion].forEach((cat, index) => {
        cambios.push({
          ...cat,
          prioridad: index,
        });
      });
    });

    if (typeof onSave === "function") {
      onSave(cambios);
    } else {
      console.log("Cambios de prioridades:", cambios);
      alert("Cambios listos para guardar (ver consola)");
    }
  };

  return (
    <div className="categorias-admin">
      {/* 🔽 Botón/título para abrir/cerrar el menú */}
      <h3
        className="toggle-main"
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: "pointer" }}
      >
        {isOpen ? "▼" : "▶"} Ordenar categorías
      </h3>

      {isOpen && (
        <div className="categorias-content">
          {Object.keys(data).map((ubicacion) => {
            if (ubicacion.toLowerCase() === "menú") return null;
            return (
              <div key={ubicacion} className="ubicacion-group">
                <button
                  className="toggle-group"
                  onClick={() =>
                    setOpenGroup(openGroup === ubicacion ? null : ubicacion)
                  }
                >
                  {openGroup === ubicacion ? "▼" : "▶"} {ubicacion}
                </button>

                {openGroup === ubicacion && (
                  <DragDropContext
                    onDragEnd={(result) => handleDragEnd(result, ubicacion)}
                  >
                    <Droppable droppableId={ubicacion}>
                      {(provided) => (
                        <ul
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="categorias-list"
                        >
                          {data[ubicacion].map((cat, index) => (
                            <Draggable
                              key={cat.id}
                              draggableId={cat.id}
                              index={index}
                            >
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="categoria-item"
                                >
                                  {cat.nombre}{" "}
                                  <span className="prioridad">
                                    (prioridad: {cat.prioridad ?? index})
                                  </span>
                                  <button
                                    className="btn-delete"
                                    onClick={() => {
                                      if (
                                        window.confirm(
                                          `¿Eliminar categoría "${cat.nombre}"? Esta acción no se puede deshacer.`
                                        )
                                      ) {
                                        if (typeof onDelete === "function") {
                                          onDelete(cat.id);
                                        }
                                      }
                                    }}
                                  >
                                    🗑️
                                  </button>
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
            );
          })}

          <button className="btn-save" onClick={handleSave}>
            Guardar cambios
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoriasOrdenables;
